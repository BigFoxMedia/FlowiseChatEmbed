import { customElement } from 'solid-element';
import { defaultBotProps } from './constants';
import { Bubble } from './features/bubble';
import { Window } from './features/window';
import { Full } from './features/full';

export const registerWebComponents = () => {
  if (typeof window === 'undefined') return;
  // @ts-expect-error element incorect type
  customElement('flowise-fullchatbot', defaultBotProps, Full);
  customElement('flowise-windowchatbot', defaultBotProps, Window);
  customElement('flowise-chatbot', defaultBotProps, Bubble);
};
