import styles from '../../../assets/index.css';
import windowOverrides from '../../../assets/windowOverrides.css';
import { Bot, BotProps } from '@/components/Bot';
import { BubbleParams } from '@/features/bubble/types';
import { createSignal, onCleanup, onMount, Show } from 'solid-js';

const defaultButtonColor = '#3B81F6';
const defaultIconColor = 'white';

export type WindowProps = BotProps & BubbleParams;

export const Window = (props: WindowProps, { element }: { element: HTMLElement }) => {
  const [isBotDisplayed, setIsBotDisplayed] = createSignal(false);

  const launchBot = () => {
    setIsBotDisplayed(true);
  };

  const botLauncherObserver = new IntersectionObserver((intersections) => {
    if (intersections.some((intersection) => intersection.isIntersecting)) launchBot();
  });

  onMount(() => {
    botLauncherObserver.observe(element);
  });

  onCleanup(() => {
    botLauncherObserver.disconnect();
  });

  onMount(() => {
    const adjustHeight = () => {
      if (element && element.parentElement) {
        element.style.height = `calc( ${element.parentElement.offsetHeight}px - 160px )`;
      }
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  });

  console.log('Window | props', props);

  return (
    <>
      <style>{styles}</style>
      <style>{windowOverrides}</style>
      <Show when={isBotDisplayed()}>
        <div
          style={{
            'background-color': props.theme?.chatWindow?.backgroundColor || '#ffffff',
            height: props.theme?.chatWindow?.height ? `${props.theme?.chatWindow?.height.toString()}` : '100vh',
            width: props.theme?.chatWindow?.width ? `${props.theme?.chatWindow?.width.toString()}` : '100%',
            margin: '0px',
          }}
        >
          <Bot
            badgeBackgroundColor={props.theme?.chatWindow?.backgroundColor}
            chatContentBadgeBackgroundColor={props.theme?.chatWindow?.chatContentBadgeBackgroundColor}
            bubbleBackgroundColor={props.theme?.button?.backgroundColor ?? defaultButtonColor}
            titleBackgroundColor={props.theme?.chatWindow?.titleBackgroundColor}
            titleTextColor={props.theme?.chatWindow?.titleTextColor}
            bubbleTextColor={props.theme?.button?.iconColor ?? defaultIconColor}
            showTitle={props.theme?.chatWindow?.showTitle}
            title={props.theme?.chatWindow?.title}
            titleAvatarSrc={props.theme?.chatWindow?.titleAvatarSrc}
            welcomeMessage={props.theme?.chatWindow?.welcomeMessage}
            poweredByTextColor={props.theme?.chatWindow?.poweredByTextColor}
            textInput={props.theme?.chatWindow?.textInput}
            botMessage={props.theme?.chatWindow?.botMessage}
            userMessage={props.theme?.chatWindow?.userMessage}
            fontSize={props.theme?.chatWindow?.fontSize}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
            isFullPage={false}
            observersConfig={props.observersConfig}
            disableNewChatButton={props.disableNewChatButton}
          />
        </div>
      </Show>
    </>
  );
};
