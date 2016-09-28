import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import provide    from '../../src/components/provide';


//================
// TEST CONSTANTS
//================

const obj = { id: '1' };


//=========================
// CHILD CONTEXT COMPONENT
//=========================

class ChildContextComponent extends React.Component {

  render() {
    return null;
  }

}

ChildContextComponent.contextTypes = {
  name: React.PropTypes.string,
  obj: React.PropTypes.object
};


//================
// TEST COMPONENT
//================

class TestComponent extends React.Component {

  render() {
    return (
      <div className="TestComponent">
        {this.props.children}
        <ChildContextComponent />
      </div>
    );
  }

}

const TestProvider = provide({
  component: TestComponent,
  childContextTypes: {
    name: React.PropTypes.string,
    obj: React.PropTypes.object
  }
});


//================
// PROVIDER TESTS
//================

describe('Provider', () => {
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <TestProvider name="test" obj={obj}>
        {'test children'}
      </TestProvider>
    );
  });

  describe('render', () => {
    let childComponent;

    beforeEach(() => {
      childComponent = TestUtils.findRenderedComponentWithType(component, ChildContextComponent);
    });

    it('should provide its immutable props to child components as context', () => {
      expect(childComponent.context.name).toBe('test');
    });

    it('should provide its referential props to child components as context', () => {
      expect(childComponent.context.obj).toBe(obj);
    });

    it('should not provide its child props to child components as context', () => {
      expect(childComponent.context.children).toBeUndefined();
    });
  });
});
