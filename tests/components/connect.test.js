import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import connect    from '../../src/components/connect';


//================
// TEST COMPONENT
//================

class TestComponent extends React.Component {

  render() {
    return null;
  }

}

const TestConnector = connect({
  component: TestComponent,
  contextTypes: {
    name: React.PropTypes.string
  }
});


//===================
// CONTEXT COMPONENT
//===================

class ContextComponent extends React.Component {

  render() {
    return (
      <div className="ContextComponent">
        <TestConnector />
      </div>
    );
  }

  getChildContext() {
    return { name: 'test', description: 'this is a test' };
  }

}

ContextComponent.childContextTypes = {
  name: React.PropTypes.string,
  description: React.PropTypes.string
};


//=================
// CONNECTOR TESTS
//=================

describe('Connector', () => {
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <ContextComponent />
    );
  });

  describe('render', () => {
    let childComponent;

    beforeEach(() => {
      childComponent = TestUtils.findRenderedComponentWithType(component, TestComponent);
    });

    it('should render the provided component', () => {
      expect(childComponent).toBeDefined();
    });

    it('should include defined context props', () => {
      expect(childComponent.props.name).toBe('test');
    });

    it('should not include undefined context props', () => {
      expect(childComponent.props.description).toBeUndefined();
    });
  });
});
