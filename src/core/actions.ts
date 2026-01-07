import { playerState } from './state';
import {
  backgroundAudio,
  playButton,
  videoBackground
} from '../ui/dom';
import { renderTime } from '../ui/render';

export const play = () => {
  playerState.isPlaying = true;

  backgroundAudio.play();
  videoBackground.play();

  playButton.classList.add('playing');
};

export const pause = () => {
  playerState.isPlaying = false;

  backgroundAudio.pause();
  videoBackground.pause();

  playButton.classList.remove('playing');
};

export const stop = () => {
  pause();
  backgroundAudio.currentTime = 0;
  videoBackground.currentTime = 0;
};

export const setDuration = (duration: number) => {
  playerState.duration = duration;
  stop();
  renderTime(duration);
};

export const setMedia = (soundSrc: string, videoSrc: string) => {
  stop();

  playerState.soundSrc = soundSrc;
  playerState.videoSrc = videoSrc;

  backgroundAudio.src = soundSrc;
  videoBackground.src = videoSrc;
}