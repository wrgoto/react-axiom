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

const nextPublishable = {
  subscribe: () => {},
  unsubscribe: () => {},
  publish: () => {}
};


//================
// TEST COMPONENT
//================

class TestComponent extends React.Component {

  static test() {
    return null;
  }

  render() {
    return null;
  }

}

const TestSubscriber = subscribe(TestComponent);


//==================
// SUBSCRIBER TESTS
//==================

describe('Subscriber', () => {
  let component;

  beforeEach(() => {
    spyOn(publishable, 'subscribe');
    spyOn(publishable, 'unsubscribe');
    spyOn(publishable, 'publish');

    spyOn(nextPublishable, 'subscribe');
    spyOn(nextPublishable, 'unsubscribe');
    spyOn(nextPublishable, 'publish');

    component = TestUtils.renderIntoDocument(
      <TestSubscriber name="test" publishable={publishable} nullProp={null} />
    );
  });

  describe('static properties', () => {
    it('should contain a reference to the wrapped component', () => {
      expect(TestSubscriber.WrappedComponent).toBe(TestComponent);
    });
  });

  describe('static methods', () => {
    it('should be passed from the original component', () => {
      expect(TestSubscriber.test).toBeDefined();
      expect(TestSubscriber.test).toBe(TestComponent.test);
    });
  });

  describe('componentWillMount', () => {
    it('should subscribe forceUpdate to the publishable', () => {
      expect(publishable.subscribe).toBeCalledWith(component.forceUpdate);
    });
  });

  describe('componentWillReceiveProps', () => {
    describe('when next prop is not a publishable', () => {
      beforeEach(() => {
        component.componentWillReceiveProps({ name: 'test', publishable: {} })
      });

      it('should unsubscribe the current publishable', () => {
        expect(publishable.unsubscribe).toBeCalledWith(component.forceUpdate);
      });
    });

    describe('when next prop is a publishable', () => {
      beforeEach(() => {
        component.componentWillReceiveProps({ name: 'test', publishable: nextPublishable })
      });

      it('should subscribe the next publishable', () => {
        expect(nextPublishable.subscribe).toBeCalledWith(component.forceUpdate);
      });

      it('should unsubscribe the current publishable', () => {
        expect(publishable.unsubscribe).toBeCalledWith(component.forceUpdate);
      });
    });

    describe('when current prop is not a publishable and next prop is a publishable', () => {
      beforeEach(() => {
        component = TestUtils.renderIntoDocument(<TestSubscriber name="test" publishable={{}} />);
        component.componentWillReceiveProps({ name: 'test', publishable: nextPublishable })
      });

      it('should subscribe the next publishable', () => {
        expect(nextPublishable.subscribe).toBeCalledWith(component.forceUpdate);
      });
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
