import ReactAxiom, {
  subscribe,
  Model,
  Publisher,
  Store
} from '../index';


describe('ReactAxiom', () => {
  describe('default', () => {
    it('should be defined', () => {
      expect(ReactAxiom).toBeDefined();
    });

    it('should respond to subscribe', () => {
      expect(ReactAxiom.subscribe).toBeDefined();
    });

    it('should respond to Model', () => {
      expect(ReactAxiom.Model).toBeDefined();
    });

    it('should respond to Publisher', () => {
      expect(ReactAxiom.Publisher).toBeDefined();
    });

    it('should respond to Store', () => {
      expect(ReactAxiom.Store).toBeDefined();
    });
  });

  describe('subscribe', () => {
    it('should be defined', () => {
      expect(subscribe).toBeDefined();
    });
  });

  describe('Model', () => {
    it('should be defined', () => {
      expect(Model).toBeDefined();
    });
  });

  describe('Publisher', () => {
    it('should be defined', () => {
      expect(Publisher).toBeDefined();
    });
  });

  describe('Store', () => {
    it('should be defined', () => {
      expect(Store).toBeDefined();
    });
  });
});
