import React      from 'react';


const PUBLISHABLE_FUNCTION_NAMES = [
  'subscribe',
  'unsubscribe',
  'publish'
];


export default function subscribe({ component }) {

  //===================
  // WRAPPER COMPONENT
  //===================

  return class Subscriber extends React.Component {

    constructor(props) {
      super(props);
      this.forceUpdate = this.forceUpdate.bind(this);
      this._subscribe = this._subscribe.bind(this);
      this._unsubscribe = this._unsubscribe.bind(this);
    }


    //===============
    // REACT METHODS
    //===============

    componentWillMount() {
      this._getPublishables().forEach(this._subscribe);
    }

    componentWillUnmount() {
      this._getPublishables().forEach(this._unsubscribe);
    }

    render() {
      return React.createElement(component, this.props);
    }


    //==================
    // INTERNAL METHODS
    //==================

    _getPublishables() {
      return Object.keys(this.props).reduce((publishables, key) => {
        if (this._isPublishable(this.props[key])) {
          publishables.push(this.props[key]);
        }
        return publishables;
      }, []);
    }

    _isPublishable(prop) {
      return PUBLISHABLE_FUNCTION_NAMES.every(name => {
        return prop[name] && prop[name] instanceof Function;
      });
    }

    _subscribe(publishable) {
      publishable.subscribe(this.forceUpdate);
    }

    _unsubscribe(publishable) {
      publishable.unsubscribe(this.forceUpdate);
    }

  };

};
