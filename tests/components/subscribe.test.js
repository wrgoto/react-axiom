import React      from 'react';
import Enzyme     from 'enzyme';
import Adapter    from 'enzyme-adapter-react-16';
import subscribe  from '../../src/components/subscribe';

Enzyme.configure({ adapter: new Adapter() });

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
const PureSubscriber = subscribe(() => {});


//==================
// SUBSCRIBER TESTS
//==================

describe('Subscriber', () => {
  let component;
  let instance;

  beforeEach(() => {
    spyOn(publishable, 'subscribe');
    spyOn(publishable, 'unsubscribe');
    spyOn(publishable, 'publish');

    spyOn(nextPublishable, 'subscribe');
    spyOn(nextPublishable, 'unsubscribe');
    spyOn(nextPublishable, 'publish');

    component = Enzyme.shallow(
      <TestSubscriber name="test" publishable={publishable} nullProp={null} />
    );

    instance = component.instance();
  });

  describe('displayName', () => {
    it('should contain the correct wrapped name for the wrapped component', () => {
      expect(TestSubscriber.displayName).toBe('Subscriber(TestComponent)');
    });

    it('should contain the correct wrapped name for a pure component', () => {
      expect(PureSubscriber.displayName).toBe('Subscriber(Component)');
    });
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

  describe('componentDidMount', () => {
    it('should subscribe forceUpdate to the publishable', () => {
      expect(publishable.subscribe).toBeCalledWith(instance.forceUpdate);
    });
  });

  describe('componentDidUpdate', () => {
    describe('when next prop is not a publishable', () => {
      beforeEach(() => {
        component.setProps({ name: 'test', publishable: {} })
      });

      it('should unsubscribe the current publishable', () => {
        expect(publishable.unsubscribe).toBeCalledWith(instance.forceUpdate);
      });
    });

    describe('when next prop is a publishable', () => {
      beforeEach(() => {
        component.setProps({ name: 'test', publishable: nextPublishable })
      });

      it('should subscribe the next publishable', () => {
        expect(nextPublishable.subscribe).toBeCalledWith(instance.forceUpdate);
      });

      it('should unsubscribe the current publishable', () => {
        expect(publishable.unsubscribe).toBeCalledWith(instance.forceUpdate);
      });
    });

    describe('when current prop is not a publishable and next prop is a publishable', () => {
      beforeEach(() => {
        component = Enzyme.shallow(<TestSubscriber name="test" publishable={{}} />);
        component.setProps({ name: 'test', publishable: nextPublishable })
        instance = component.instance();
      });

      it('should subscribe the next publishable', () => {
        expect(nextPublishable.subscribe).toBeCalledWith(instance.forceUpdate);
      });
    });
  });

  describe('componentWillUnmount', () => {
    beforeEach(() => {
      component.unmount();
    });

    it('should subscribe forceUpdate to the publishable', () => {
      expect(publishable.unsubscribe).toBeCalledWith(instance.forceUpdate);
    });
  });

  describe('render', () => {
    let childComponent;

    beforeEach(() => {
      childComponent = component.find('TestComponent');
    });

    it('should render the provided component', () => {
      expect(childComponent).toBeDefined();
    });

    it('should include non-model props', () => {
      expect(childComponent.props().name).toBe('test');
    });

    it('should include model props', () => {
      expect(childComponent.props().publishable).toBe(publishable);
    });
  });
});
