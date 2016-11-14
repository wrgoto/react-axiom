import React                from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';


export default function connect({ component, contextTypes }) {

  //===================
  // WRAPPER COMPONENT
  //===================

  class Connector extends React.Component {

    //===============
    // REACT METHODS
    //===============

    render() {
      return React.createElement(component, this.getChildProps());
    }

    getChildProps() {
      return Object.assign(this._pickContext(), this.props);
    }


    //==================
    // INTERNAL METHODS
    //==================

    _pickContext() {
      return Object.keys(contextTypes).reduce((context, key) => {
        context[key] = this.context[key];
        return context;
      }, {});
    }

  }

  Connector.contextTypes = contextTypes;


  //=====================
  // PASS STATIC METHODS
  //=====================

  return hoistNonReactStatics(Connector, component);
};
