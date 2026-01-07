import {
  playButton,
  timeSelect,
  soundButtons
} from '../ui/dom';
import { playerState } from '../core/state';
import { play, pause, setDuration, setMedia } from '../core/actions';

export const setEvents = () => {
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

    soundButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const sound = button.dataset.sound;
          const video = button.dataset.video;
    
          if (!sound || !video) return;
    
          setMedia(sound, video);
        });
      });
} 