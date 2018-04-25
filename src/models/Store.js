import isPlainObject  from 'lodash/isPlainObject';
import find           from 'lodash/find';
import map            from 'lodash/map';
import mapValues      from 'lodash/mapValues';
import omit           from 'lodash/omit';
import pick           from 'lodash/pick';
import Model          from './Model';


class Store extends Model {

  //===============
  // CLASS METHODS
  //===============

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
    const models = this._createEmptyModelsHash();

    // If keys are identified for a partial stringify pick them
    // from state. Otherwise, use the entire state object with
    // entityDefinitions omitted.

    const partialState = keys.length
      ? pick(this.state, keys)
      : omit(this.state, 'entityDefinitions');

    const state = this._toSerialState(partialState, models);

    return JSON.stringify({ state, models });
  }

  parse(json) {
    const { state, models } = JSON.parse(json);
    const newModels = this._createEmptyModelsHash();
    const entityDefinitions = pick(this.state, 'entityDefinitions');
    const restoredState = this._fromSerialState(state, models, newModels);

    // Parse will completely replace the current store with the
    // provided JSON.

    this.state = Object.assign(entityDefinitions, restoredState);
  }

  parseMerge(json) {
    const { state, models } = JSON.parse(json);
    const newModels = this._createEmptyModelsHash();
    const partialState = this._fromSerialState(state, models, newModels);

    // ParseMerge will merge data provided by the JSON with the
    // existing entities and data from the current store.

    Object.assign(this.state, partialState);
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
    Object.keys(this.state.entityDefinitions).forEach(key => this._createEntityHelper(key));
  }

  _createEntityHelper(key) {
    const cappedKey = key[0].toUpperCase() + key.substring(1);
    const findKey = `find${cappedKey}`;

    if (isPlainObject(this.state[key])) {
      this.constructor.prototype[findKey] = this[findKey] || function (id) {
        return id instanceof Array
          ? id.map(_id => this.state[key][_id])
          : this.state[key][id];
      };
    }
  }

  _createEmptyModelsHash() {
    return map(this.state.entityDefinitions).reduce((hash, Model) => {
      hash[Model.name] = {};
      return hash;
    }, {});
  }

  _toSerial(data, modelsHash) {
    if (data instanceof Model) {
      return this._toSerialModel(data, modelsHash);
    }

    if (isPlainObject(data)) {
      return this._toSerialState(data, modelsHash);
    }

    if (data instanceof Array) {
      return data.map(datum => this._toSerial(datum, modelsHash));
    }

    return data;
  }

  _toSerialState(state, modelsHash) {
    const _state = omit(state, 'store');

    return mapValues(_state, (value, key) =>
      this._toSerial(_state[key], modelsHash)
    );
  }

  _toSerialModel(model, modelsHash) {
    const { _id, constructor, state } = model;
    const _constructor = constructor.name;

    if (!modelsHash[_constructor][_id]) {
      modelsHash[_constructor][_id] = this._toSerialState(state, modelsHash);
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

    const Constructor = find(this.state.entityDefinitions, { name: _constructor });
    const partialState = this._fromSerial(models[_constructor][_id], models, newModels);
    const state = Object.assign({ store: this }, partialState);

    return newModelHash[_id] = new Constructor(state);
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

Store.updateQueue = [];


export default Store;
