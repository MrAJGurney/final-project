class EventBus {
  constructor(eventTopics) {
    this.topics = {};
    this.eventTopics = eventTopics;

    eventTopics.forEach((topic) => {
      this.topics[topic] = [];
    });
  }

  subscribe(topic, listener) {
    this._validateTopic(topic);
    this._addListenerToTopic(topic, listener);
  }

  _validateTopic(topic) {
    const { topics } = this;
    if(!topics.hasOwnProperty(topic)) {
      throw new Error("Invalid topic: " + topic);
    }
  }

  _addListenerToTopic(topic, listener) {
    const { topics } = this;
    topics[topic].push(listener);
  }

  publish(topic, data) {
    if (!this._hasListeners(topic)) {
      return;
    }
    this._sendDataToListeners(topic, data);
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
      if (typeof data === 'object') {
        listener(data);
      } else {
        let emptyObject = {};
        listener(emptyObject);
      }
    });
  }
}

export default EventBus;
