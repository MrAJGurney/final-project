import EventBus from './event-bus';

describe('event-bus', () => {
  const A = 'A';
  const B = 'B';
  const C = 'C';
  const topics = [A, B, C];

  const listener = jest.fn();

  const data = {'payload': 1234567890};

  let eventBus;
  beforeEach(() => {
    eventBus = new EventBus(topics);
    jest.resetAllMocks();
  });

  describe('constructor(eventTopics)', () => {
    it('initializes topic store ', () => {
      const expectedTopicStore = {A: [], B: [], C: []};
      const actualTopicStore = eventBus.topics;

      expect(actualTopicStore).toEqual(expectedTopicStore);
    });
  });
  describe('subscribe(topic, listener)', () => {
    it('throws error if topic is not in topic store', () => {
      const topic = 'Z';

      const expectedError = new Error('Invalid topic: Z');
      const testMethod = () => {
        eventBus.subscribe(topic, listener);
      };

      expect(testMethod).toThrow(expectedError);
    });
    it('does nothing if topic is in topic store', () => {
      const testMethod = () => {
        eventBus.subscribe(A, listener);
      };

      expect(testMethod).not.toThrow();
    });
  });
  describe('publish(topic, data)', () => {
    it('calls listeners', () => {
      eventBus.subscribe(A, listener);
      eventBus.publish(A, data);

      const expectedTimesCalled = 1;
      const actualTimesCalled = listener.mock.calls.length;

      expect(actualTimesCalled).toBe(expectedTimesCalled);
    });
    it('only calls relevant listeners', () => {
      eventBus.subscribe(A, listener);
      eventBus.publish(B, data);

      const expectedTimesCalled = 0;
      const actualTimesCalled = listener.mock.calls.length;

      expect(actualTimesCalled).toBe(expectedTimesCalled);
    });
    it('calls multiple listeners', () => {
      eventBus.subscribe(A, listener);
      eventBus.subscribe(A, listener);
      eventBus.subscribe(A, listener);
      eventBus.publish(A, data);

      const expectedTimesCalled = 3;
      const actualTimesCalled = listener.mock.calls.length;

      expect(actualTimesCalled).toBe(expectedTimesCalled);
    });
    it('passes data into listeners', () => {
      eventBus.subscribe(A, listener);
      eventBus.publish(A, data);

      expect(listener).toBeCalledWith(data);
    });
    it('does nothing with invalid topic', () => {
      const topic = 'Z';

      const testMethod = () => {
        eventBus.publish(topic, data);
      };

      expect(testMethod).not.toThrow();
    });
    it('passes empty object if there\'s no data', () => {
      const emptyObject = {};

      eventBus.subscribe(A, listener);
      eventBus.publish(A);

      expect(listener).toBeCalledWith(emptyObject);
    });
  });
});
