import { observersConfigType } from './components/Bot';

/* eslint-disable solid/reactivity */
type BotProps = {
  chatflowid: string;
  apiHost?: string;
  chatflowConfig?: Record<string, unknown>;
  observersConfig?: observersConfigType;
	disableNewChatButton?: boolean;
};

let elementUsed: Element | undefined;

export const initFull = (props: BotProps & { id?: string }) => {
	console.log("initFull | props", props)
  destroy();
  const fullElement = props.id ? document.getElementById(props.id) : document.querySelector('flowise-fullchatbot');
  if (!fullElement) throw new Error('<flowise-fullchatbot> element not found.');
  Object.assign(fullElement, props);
  elementUsed = fullElement;
};

export const initWindow = (props: BotProps & { id?: string }) => {
	console.log("initWindow | props", props)
  destroy();
  const windowElement = props.id ? document.getElementById(props.id) : document.querySelector('flowise-windowchatbot');
  if (!windowElement) throw new Error('<flowise-windowchatbot> element not found.');
  Object.assign(windowElement, props);
  elementUsed = windowElement;
};

export const init = (props: BotProps) => {
	console.log("init | props", props)
  destroy();
  const element = document.createElement('flowise-chatbot');
  Object.assign(element, props);
  document.body.appendChild(element);
  elementUsed = element;
};

export const destroy = () => {
  elementUsed?.remove();
};

type Chatbot = {
  initFull: typeof initFull;
  initWindow: typeof initWindow;
  init: typeof init;
  destroy: typeof destroy;
};

declare const window:
  | {
      Chatbot: Chatbot | undefined;
    }
  | undefined;

export const parseChatbot = () => ({
  initFull,
  initWindow,
  init,
  destroy,
});

export const injectChatbotInWindow = (bot: Chatbot) => {
	console.log("injectChatbotInWindow | bot", bot)
	console.log("injectChatbotInWindow | window", window)
  if (typeof window === 'undefined') return;
  window.Chatbot = { ...bot };
};
