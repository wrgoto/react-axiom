import React from 'react';


export default function provide({ component, childContextTypes }) {

  //===================
  // WRAPPER COMPONENT
  //===================

  class Provider extends React.Component {

    //===============
    // REACT METHODS
    //===============

    render() {
      return React.createElement(component, this.props);
    }


    //==================
    // INTERNAL METHODS
    //==================

    getChildContext() {
      return this.pickProps();
    }

    pickProps() {
      return Object.keys(this.props).reduce((props, key) => {
        if (key !== 'children') props[key] = this.props[key];
        return props;
      }, {});
    }

  }

  Provider.childContextTypes = childContextTypes;

  return Provider
};
