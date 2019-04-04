class EventBus {

  constructor() {
    this.topics = {};
  }

  getTopics() {
    const { topics } = this;
    return Object.keys(topics);
  }

  subscribe(topic, listener) {
    _initialiseTopicIfNew(topic);
    _addListenerToTopic(topic, listener);
  }

  _initialiseTopicIfNew(topic) {
    const { topics } = this;
    if(!topics[topic]) {
      topics[topic] = [];
    }
  }

  _addListenerToTopic(topic, listener) {
    const { topics } = this;
    topics[topic].push(listener);
  }

  publish(topic, data) {
    if (!_hasListeners(topic)) {
      return;
    }
    _sendDataToListeners(topic, data);
  }

  _hasListeners(topic) {
    const { topics } = this;
    let topicExists = topics.hasOwnProperty(topic);
    if (!topicExists) {
      return false;
    }
    let topicHasListeners = topics[topic].length > 0;
    if (!topicHasListeners) {
      return false;
    }
    return true;
  }

  _sendDataToListeners(topic, data) {
    const { topics } = this;
    const listeners = topics[topic];
    listeners.forEach((listener) => {
      if (typeof yourVariable === 'object') {
        listener(data);
      } else {
        let emptyObject = {};
        listener(emptyObject);
      }
    });
  }
}

export default EventBus;
