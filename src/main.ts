import { backgroundAudio, playButton, videoBackground } from './ui/dom';
import './styles/main.scss';

const app = () => {
  const outline = document.querySelector(
    '.moving-outline circle',
  ) as SVGCircleElement;
  const sounds = document.querySelectorAll(
    '.sound-picker button',
  ) as NodeListOf<HTMLButtonElement>;
  const timeDisplay = document.querySelector('.time-display') as HTMLDivElement;
  const timeSelect = document.querySelectorAll(
    '.time-select button',
  ) as NodeListOf<HTMLButtonElement>;
  const outlineLength = outline.getTotalLength();
  let fakeDuration = 120;

  outline.style.strokeDasharray = outlineLength as unknown as string;
  outline.style.strokeDashoffset = outlineLength as unknown as string;

    playButton.addEventListener('click', () => {
    if (backgroundAudio.paused) {
      backgroundAudio.play();
      videoBackground.play();
      playButton.classList.add('playing');
    } else {
      backgroundAudio.pause();
      videoBackground.pause();
      playButton.classList.remove('playing');
    }
  });

  timeSelect.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', () => {
      fakeDuration = parseInt(button.dataset.time!);
      timeDisplay.textContent = `${formatNumber(Math.floor(fakeDuration / 60))}:${formatNumber(Math.floor(fakeDuration % 60))}`;
    });
  });

  sounds.forEach((button) => {
    button.addEventListener('click', () => {
      if (!button.dataset.sound || !button.dataset.video) return;
      backgroundAudio.src = button.dataset.sound;
      videoBackground.src = button.dataset.video;
      playButton.classList.remove('playing');
    });
  });

  backgroundAudio.ontimeupdate = () => {
    let currentTime = backgroundAudio.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress as unknown as string;

    timeDisplay.textContent = `${formatNumber(minutes)}:${formatNumber(seconds)}`;

    if (currentTime >= fakeDuration) {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
      videoBackground.pause();
    }
  };

  const formatNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };
};

app();
