export default class Publisher {

  constructor() {
    this._subscriptions = [];
  }


  //=====================
  // INTERFACING METHODS
  //=====================

  subscribe(callback) {
    this._subscriptions.push(callback);
  }

  unsubscribe(callback) {
    this._subscriptions.splice(this._subscriptions.indexOf(callback), 1);
  }

  publish() {
    this._subscriptions.forEach(callback => callback());
  }

};
