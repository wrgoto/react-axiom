import React                from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';


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

    getChildContext() {
      return this._pickProps();
    }


    //==================
    // INTERNAL METHODS
    //==================

    _pickProps() {
      return Object.keys(this.props).reduce((props, key) => {
        if (key !== 'children') props[key] = this.props[key];
        return props;
      }, {});
    }

  }

  Provider.childContextTypes = childContextTypes;


  //=====================
  // PASS STATIC METHODS
  //=====================

  return hoistNonReactStatics(Provider, component);
};
