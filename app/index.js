import App from './app';

import EventBus from './resources/event-bus/event-bus';
import EVENT_TOPICS from './resources/event-bus/event-topics';
import CONFIG from './resources/config';

window.addEventListener('load', onLoad);

function onLoad() {
  const config = CONFIG;

  const elements = {
    lSystemSelector: document.querySelector('#l-system-selector'),
    visualiser: document.querySelector('#visualiser'),
  };

  const eventBus = new EventBus(EVENT_TOPICS);

  new App(config, elements, eventBus);

  window.addEventListener('resize', () => {
    eventBus.publish('ON_WINDOW_RESIZE');
  }, false);
};
