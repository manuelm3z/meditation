import { backgroundAudio, outline } from './ui/dom';
import './styles/main.scss';
import { renderTime } from './ui/render';
import { stop } from './core/actions';
import { playerState } from './core/state';
import { setEvents } from './ui/events';

const app = () => {
  setEvents();

  const outlineLength = outline.getTotalLength();
  outline.style.strokeDasharray = outlineLength as unknown as string;
  outline.style.strokeDashoffset = outlineLength as unknown as string;

  backgroundAudio.ontimeupdate = () => {
    let currentTime = backgroundAudio.currentTime;
    let elapsed = playerState.duration - currentTime;

    renderTime(elapsed);

    const progress =
      outlineLength - (currentTime / playerState.duration) * outlineLength;
    outline.style.strokeDashoffset = progress as unknown as string;

    if (currentTime >= playerState.duration && playerState.isPlaying) {
      stop();
    }
  };
};

app();
