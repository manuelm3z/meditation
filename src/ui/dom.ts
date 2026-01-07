export const backgroundAudio = document.getElementById(
  'audio-element',
) as HTMLAudioElement;
export const videoBackground = document.getElementById(
  'video-element',
) as HTMLVideoElement;
export const playButton = document.getElementById('start') as HTMLButtonElement;
export const timeDisplay = document.querySelector(
  '.time-display',
) as HTMLDivElement;
export const outline = document.querySelector(
  '.moving-outline circle',
) as SVGCircleElement;
export const soundButtons = document.querySelectorAll(
  '.sound-picker button',
) as NodeListOf<HTMLButtonElement>;
export const timeSelect = document.querySelectorAll(
  '.time-select button',
) as NodeListOf<HTMLButtonElement>;
