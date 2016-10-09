import Model from '../../src/models/Model';


//================
// TEST CONSTANTS
//================

const obj = { id: '1' };


//============
// TEST MODEL
//============

class Test extends Model {
  constructor({ id, test = true, obj = {} }) {
    super({ id, test, obj });
  }
}


//==================
// SUBSCRIBER TESTS
//==================

describe('Model', () => {
  let model;

  beforeEach(() => {
    model = new Test({ id: '1', obj });
  });

  describe('as a publishable', () => {
    it('should respond to subscribe', () => {
      expect(model.subscribe).toBeDefined();
      expect(model.subscribe instanceof Function).toBe(true);
    });

    it('should respond to unsubscribe', () => {
      expect(model.unsubscribe).toBeDefined();
      expect(model.unsubscribe instanceof Function).toBe(true);
    });

    it('should respond to publish', () => {
      expect(model.publish).toBeDefined();
      expect(model.publish instanceof Function).toBe(true);
    });
  });

  describe('setAccessors', () => {
    describe('when state is not a boolean', () => {
      it('should create a get function', () => {
        expect(model.getId()).toBe(model.state.id);
      });

      it('should create a set function', () => {
        jest.useFakeTimers();
        model.setId('2');
        jest.runOnlyPendingTimers();
        expect(model.state.id).toBe('2');
      });

      it('should create a has function', () => {
        expect(model.hasId()).toBe(true);
      });
    });

    describe('when state is a boolean', () => {
      it('should create an is function', () => {
        expect(model.isTest()).toBe(true);
      });

      it('should create a set function', () => {
        jest.useFakeTimers();
        model.setTest(false);
        jest.runOnlyPendingTimers();
        expect(model.state.test).toBe(false);
      });

      it('should create a has function', () => {
        expect(model.hasTest()).toBe(true);
      });
    });
  });

  describe('setState', () => {
    beforeEach(() => {
      spyOn(model, 'publish');
    });

    describe('when diff is immutable', () => {
      beforeEach(() => {
        jest.useFakeTimers();
        model.setState({ id: '2' });
        jest.runOnlyPendingTimers();
      });

      it('should update the state', () => {
        expect(model.state.id).toBe('2');
      });

      it('should call publish', () => {
        expect(model.publish).toBeCalled();
      });
    });

    describe('when diff is mutable', () => {
      beforeEach(() => {
        jest.useFakeTimers();
        obj.id = '2';
        model.setState({ obj });
        jest.runOnlyPendingTimers();
      });

      it('should update the state via mutation', () => {
        expect(model.state.obj.id).toBe('2');
      });

      it('should not call publish', () => {
        expect(model.publish).not.toBeCalled();
      });
    });
  });
});
