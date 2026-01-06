const app = () => {
  const song = document.querySelector('.song') as HTMLAudioElement;
  const play = document.querySelector('.play') as HTMLImageElement;
  const outline = document.querySelector(
    '.moving-outline circle',
  ) as SVGCircleElement;
  const video = document.querySelector(
    '.vid-container video',
  ) as HTMLVideoElement;
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

  play.addEventListener('click', () => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './src/svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './src/svg/play.svg';
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
      song.src = button.dataset.sound;
      video.src = button.dataset.video;
    });
  });

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress as unknown as string;

    timeDisplay.textContent = `${formatNumber(minutes)}:${formatNumber(seconds)}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './src/svg/play.svg';
      video.pause();
    }
  };

  const formatNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };
};

app();
