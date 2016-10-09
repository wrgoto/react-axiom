import isPlainObject  from 'lodash/isPlainObject';
import Model          from './Model';


export default class Store extends Model {

  constructor({ models = [], state = {} }) {
    super(state);
    this.initModelNamesHash(models);
  }


  //================
  // PUBLIC METHODS
  //================

  stringify() {
    const models = this.createModelsHash();
    const state = this.toSerializableState(this.state, models);
    return JSON.stringify({ state, models });
  }

  parse(json) {
    const { state, models } = JSON.parse(json);
    const newModels = this.createModelsHash();
    this.state = this.fromSerializableState(state, models, newModels);
  }


  //=================
  // PRIVATE METHODS
  //=================

  initModelNamesHash(models) {
    this.modelsHash = models.reduce((hash, model) => {
      hash[model.name] = model;
      return hash;
    }, {});
  }

  createModelsHash() {
    return Object.keys(this.modelsHash).reduce((hash, key) => {
      hash[key] = {};
      return hash;
    }, {});
  }

  toSerializableState(state, store) {
    return Object.keys(state).reduce((serializableState, key) => {
      serializableState[key] = this.toSerializable(state[key], store);
      return serializableState;
    }, {});
  }

  fromSerializableState(state, models, newModels) {
    return Object.keys(state).reduce((finalState, key) => {
      finalState[key] = this.fromSerializable(state[key], models, newModels);
      return finalState;
    }, {});
  }

  toSerializable(data, store) {
    if (data instanceof Model) {
      const { constructor, state } = data;

      if (!store[constructor.name][state.id]) {
        store[constructor.name][state.id] = this.toSerializableState(state, store);
      }

      return {
        _constructor: constructor.name,
        id: state.id
      };
    }

    if (isPlainObject(data)) {
      return this.toSerializableState(data, store);
    }

    if (data instanceof Array) {
      return data.map(datum => this.toSerializable(datum, store));
    }

    return data;
  }
  
  fromSerializable(data, models, newModels) {
    if (isPlainObject(data)) {
      if (data._constructor) {
        const name = data._constructor;

        if (newModels[name][data.id]) {
          return newModels[name][data.id];
        }

        delete data._constructor;
        const state = this.fromSerializable(models[name][data.id], models, newModels);
        const newModel =  new this.modelsHash[name](state);
        newModels[name][data.id] = newModel;
        return newModel;
      }

      return this.fromSerializableState(data, models, newModels);
    }

    if (data instanceof Array) {
      return data.map(datum => this.fromSerializable(datum, models, newModels));
    }

    return data;
  }

}
