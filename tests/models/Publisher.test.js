import Publisher from '../../src/models/Publisher';


describe('Publisher', () => {
  let publisher;
  let callback;

  beforeEach(() => {
    publisher = new Publisher();
    callback = jest.fn();
  });

  describe('given a subscribed callback', () => {
    beforeEach(() => {
      publisher.subscribe(callback);
    });

    describe('publish', () => {
      beforeEach(() => {
        publisher.publish();
      });

      it('should call the given callback', () => {
        expect(callback).toBeCalled();
      });
    });
  });

  describe('given an unsubscribed callback', () => {
    beforeEach(() => {
      publisher.subscribe(callback);
      publisher.unsubscribe(callback);
    });

    describe('publish', () => {
      beforeEach(() => {
        publisher.publish();
      });

      it('should not call the given callback', () => {
        expect(callback).not.toBeCalled();
      });
    });
  });
});
