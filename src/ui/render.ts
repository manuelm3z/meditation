import { timeDisplay } from '../ui/dom';

const formatNumber = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

export const renderTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  timeDisplay.textContent = `${formatNumber(minutes)}:${formatNumber(seconds)}`;
};
