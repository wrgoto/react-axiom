import ReactAxiom, {
  connect,
  provide,
  subscribe,
  Model,
  Publisher
} from '../src/index';


describe('ReactAxiom', () => {
  describe('default', () => {
    it('should be defined', () => {
      expect(ReactAxiom).toBeDefined();
    });

    it('should respond to connect', () => {
      expect(ReactAxiom.connect).toBeDefined();
    });

    it('should respond to provide', () => {
      expect(ReactAxiom.provide).toBeDefined();
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
  });

  describe('connect', () => {
    it('should be defined', () => {
      expect(connect).toBeDefined();
    });
  });

  describe('provide', () => {
    it('should be defined', () => {
      expect(provide).toBeDefined();
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
});
