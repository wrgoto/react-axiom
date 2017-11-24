import isPlainObject  from 'lodash/isPlainObject';
import mapValues      from 'lodash/mapValues';
import pick           from 'lodash/pick';
import Model          from './Model';


class Store extends Model {

  //===============
  // CLASS METHODS
  //===============

  static setModelRefs(models) {
    Store.models = models;
    Store.modelsHash = models.reduce((hash, model) => {
      hash[model.name] = model;
      return hash;
    }, {});
  }

  static defaultState() {
    return {
      entityDefinitions: {}
    };
  }


  //=============
  // CONSTRUCTOR
  //=============

  constructor(state) {
    super(state);
    this._createEntityHelpers();
  }


  //=====================
  // INTERFACING METHODS
  //=====================

  stringify(...keys) {
    const models = this._createModelsHash();
    const _state = keys.length ? pick(this.state, keys) : this.state;
    const state = this._toSerialState(_state, models);
    return JSON.stringify({ state, models });
  }

  parse(json) {
    const { state, models } = JSON.parse(json);
    const newModels = this._createModelsHash();
    this.state = this._fromSerialState(state, models, newModels);
  }

  parseMerge(json) {
    const { state, models } = JSON.parse(json);
    const newModels = this._createModelsHash();
    Object.assign(this.state, this._fromSerialState(state, models, newModels));
  }

  addEntities(entities) {
    this.setState(this._mergeEntities(entities));
    this._publishUpdateQueue();
    this._clearUpdateQueue();
  }


  //==================
  // INTERNAL METHODS
  //==================

  _createEntityHelpers() {
    Object.keys(this.state.entityDefinitions).forEach(key => {
      const cappedKey = key[0].toUpperCase() + key.substring(1);
      const findKey = `find${cappedKey}`;

      if (isPlainObject(this.state[key])) {
        this.constructor.prototype[findKey] = this[findKey] || function (id) {
          return id instanceof Array
            ? id.map(_id => this.state[key][_id])
            : this.state[key][id];
        };
      }
    });
  }

  _createModelsHash() {
    return mapValues(Store.modelsHash, () => {
      return {};
    });
  }

  _toSerial(data, store) {
    if (data instanceof Model) {
      return this._toSerialModel(data, store);
    }

    if (isPlainObject(data)) {
      return this._toSerialState(data, store);
    }

    if (data instanceof Array) {
      return data.map(datum => this._toSerial(datum, store));
    }

    return data;
  }

  _toSerialState(state, store) {
    return mapValues(state, (value, key) =>
      this._toSerial(state[key], store)
    );
  }

  _toSerialModel(model, store) {
    const { _id, constructor, state } = model;
    const _constructor = constructor.name;

    if (!store[_constructor][_id]) {
      store[_constructor][_id] = this._toSerialState(state, store);
    }

    return { _constructor, _id };
  }

  _fromSerial(data, models, newModels) {
    if (isPlainObject(data)) {
      if (data._constructor) {
        return this._fromSerialModel(data, models, newModels);
      }

      return this._fromSerialState(data, models, newModels);
    }

    if (data instanceof Array) {
      return data.map(datum => this._fromSerial(datum, models, newModels));
    }

    return data;
  }

  _fromSerialState(state, models, newModels) {
    return mapValues(state, (value, key) =>
      this._fromSerial(value, models, newModels)
    );
  }

  _fromSerialModel(model, models, newModels) {
    const { _id, _constructor } = model;
    const newModelHash = newModels[_constructor];

    if (newModelHash[_id]) {
      return newModelHash[_id];
    }

    const newModel = new Store.modelsHash[_constructor](
      this._fromSerial(models[_constructor][_id], models, newModels)
    );

    return newModelHash[_id] = newModel;
  }

  _mergeEntities(entities) {
    return mapValues(entities, (entity, key) =>
      this._mergeEntity(entity, key)
    );
  }

  _mergeEntity(entity, key) {
    return Object.assign({}, this.state[key], this._mergeInstances(entity, key));
  }

  _mergeInstances(entity, key) {
    return mapValues(entity, (instance, id) =>
      this._instanceExists(key, id)
        ? this._updateExistingInstance(key, id, instance)
        : this._createNewInstance(key, instance)
    );
  }

  _instanceExists(key, id) {
    return !!this.state[key][id];
  }

  _updateExistingInstance(key, id, instance) {
    const existingInstance = this.state[key][id];
    Object.assign(existingInstance.state, instance);
    this._addToUpdateQueue(existingInstance)
    return existingInstance;
  }

  _addToUpdateQueue(model) {
    Store.updateQueue.push(model);
  }

  _clearUpdateQueue() {
    Store.updateQueue.length = 0;
  }

  _publishUpdateQueue() {
    Store.updateQueue.forEach(model => model.publish());
  }

  _createNewInstance(key, instance) {
    const Model = this.getEntityDefinitions()[key];
    return new Model(Object.assign({}, instance, { store: this }));
  }

}


//==================
// CLASS PROPERTIES
//==================

Store.models = [];
Store.modelsHash = {};
Store.updateQueue = [];


export default Store;
