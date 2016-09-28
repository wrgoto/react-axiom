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
      this.subscribe = this.subscribe.bind(this);
      this.unsubscribe = this.unsubscribe.bind(this);
    }


    //===============
    // REACT METHODS
    //===============

    componentWillMount() {
      this.getPublishables().forEach(this.subscribe);
    }

    componentWillUnmount() {
      this.getPublishables().forEach(this.unsubscribe);
    }

    render() {
      return React.createElement(component, this.props);
    }


    //=================
    // PRIVATE METHODS
    //=================

    getPublishables() {
      return Object.keys(this.props).reduce((publishables, key) => {
        if (this.isPublishable(this.props[key])) {
          publishables.push(this.props[key]);
        }
        return publishables;
      }, []);
    }

    isPublishable(prop) {
      return PUBLISHABLE_FUNCTION_NAMES.every(name => {
        return prop[name] && prop[name] instanceof Function;
      });
    }

    subscribe(publishable) {
      publishable.subscribe(this.forceUpdate);
    }

    unsubscribe(publishable) {
      publishable.unsubscribe(this.forceUpdate);
    }

  };

};
