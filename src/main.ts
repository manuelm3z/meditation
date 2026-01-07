import {
  backgroundAudio,
  playButton,
  videoBackground,
  timeDisplay,
} from './ui/dom';
import './styles/main.scss';
import { PlayerState } from './core/types';

const playerState: PlayerState = {
  isPlaying: false,
  duration: 120,
  soundSrc: null,
  videoSrc: null,
};

const play = () => {
  playerState.isPlaying = true;

  backgroundAudio.play();
  videoBackground.play();

  playButton.classList.add('playing');
};

const pause = () => {
  playerState.isPlaying = false;

  backgroundAudio.pause();
  videoBackground.pause();

  playButton.classList.remove('playing');
};

const stop = () => {
  pause();
  backgroundAudio.currentTime = 0;
  videoBackground.currentTime = 0;
};

const formatNumber = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

const renderTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  timeDisplay.textContent = `${formatNumber(minutes)}:${formatNumber(seconds)}`;
};

const setDuration = (duration: number) => {
  playerState.duration = duration;
  stop();
  renderTime(duration);
};

const setMedia = (soundSrc: string, videoSrc: string) => {
  stop();

  playerState.soundSrc = soundSrc;
  playerState.videoSrc = videoSrc;

  backgroundAudio.src = soundSrc;
  videoBackground.src = videoSrc;
}

const app = () => {
  const outline = document.querySelector(
    '.moving-outline circle',
  ) as SVGCircleElement;
  const sounds = document.querySelectorAll(
    '.sound-picker button',
  ) as NodeListOf<HTMLButtonElement>;
  const timeSelect = document.querySelectorAll(
    '.time-select button',
  ) as NodeListOf<HTMLButtonElement>;
  const outlineLength = outline.getTotalLength();

  outline.style.strokeDasharray = outlineLength as unknown as string;
  outline.style.strokeDashoffset = outlineLength as unknown as string;

  playButton.addEventListener('click', () => {
    if (playerState.isPlaying) {
      pause();
    } else {
      play();
    }
  });

  timeSelect.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', () => {
      const duration = Number(button.dataset.time);
      if (!duration) return;

      setDuration(duration);
    });
  });

  sounds.forEach((button) => {
    button.addEventListener('click', () => {
      const sound = button.dataset.sound;
      const video = button.dataset.video;

      if (!sound || !video) return;

      setMedia(sound, video);
    });
  });

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
