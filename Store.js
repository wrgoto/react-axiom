import isPlainObject  from 'lodash/isPlainObject';
import pick           from 'lodash/pick';
import Model          from './Model';


export default class Store extends Model {

  //==================
  // CLASS PROPERTIES
  //==================

  static models = [];
  static modelsHash = {};


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


  //==================
  // INTERNAL METHODS
  //==================

  _createModelsHash() {
    return Object.keys(Store.modelsHash).reduce((hash, key) => {
      hash[key] = {};
      return hash;
    }, {});
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
    return Object.keys(state).reduce((serializableState, key) => {
      serializableState[key] = this._toSerial(state[key], store);
      return serializableState;
    }, {});
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
    return Object.keys(state).reduce((finalState, key) => {
      finalState[key] = this._fromSerial(state[key], models, newModels);
      return finalState;
    }, {});
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

}
