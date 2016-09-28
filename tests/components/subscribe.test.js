import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import subscribe  from '../../src/components/subscribe';


//================
// TEST CONSTANTS
//================

const publishable = {
  subscribe: () => {},
  unsubscribe: () => {},
  publish: () => {}
};


//================
// TEST COMPONENT
//================

class TestComponent extends React.Component {

  render() {
    return null;
  }

}

const TestSubscriber = subscribe({
  component: TestComponent
});


//==================
// SUBSCRIBER TESTS
//==================

describe('Subscriber', () => {
  let component;

  beforeEach(() => {
    spyOn(publishable, 'subscribe');
    spyOn(publishable, 'unsubscribe');
    spyOn(publishable, 'publish');

    component = TestUtils.renderIntoDocument(
      <TestSubscriber name="test" publishable={publishable} />
    );
  });

  describe('componentWillMount', () => {
    it('should subscribe forceUpdate to the publishable', () => {
      expect(publishable.subscribe).toBeCalledWith(component.forceUpdate);
    });
  });

  describe('componentWillUnmount', () => {
    beforeEach(() => {
      component.componentWillUnmount();
    });

    it('should subscribe forceUpdate to the publishable', () => {
      expect(publishable.unsubscribe).toBeCalledWith(component.forceUpdate);
    });
  });

  describe('render', () => {
    let childComponent;

    beforeEach(() => {
      childComponent = TestUtils.findRenderedComponentWithType(component, TestComponent);
    });

    it('should render the provided component', () => {
      expect(childComponent).toBeDefined();
    });

    it('should include non-model props', () => {
      expect(childComponent.props.name).toBe('test');
    });

    it('should include model props', () => {
      expect(childComponent.props.publishable).toBe(publishable);
    });
  });
});
