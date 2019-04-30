import EventBus from './event-bus';

describe('event-bus', () => {
  describe('constructor', () => {
    it('initializes topic store', () => {
      const mockTopics = ['MOCK_TOPIC'];
      const eventBus = new EventBus(mockTopics);

      const expectedTopicStore = {'MOCK_TOPIC': []};
      const actualTopicStore = eventBus.topics;

      expect(actualTopicStore).toEqual(expectedTopicStore);
    });
    it('initializes topic store with multiple topics', () => {
      const mockTopics = ['ONE', 'TWO'];
      const eventBus = new EventBus(mockTopics);

      const expectedTopicStore = {'ONE': [], 'TWO': []};
      const actualTopicStore = eventBus.topics;

      expect(actualTopicStore).toEqual(expectedTopicStore);
    });
  });
});
