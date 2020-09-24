const app = () => {
  const song = document.querySelector('.song')
  const play = document.querySelector('.play')
  const outline = document.querySelector('.moving-outline circle')
  const video = document.querySelector('.vid-container video')
  const sounds = document.querySelectorAll('.sound-picker button')
  const timeDisplay = document.querySelector('.time-display')
  const timeSelect = document.querySelectorAll('.time-select button')
  const outlineLength = outline.getTotalLength()
  let fakeDuration = 120

  outline.style.strokeDasharray = outlineLength
  outline.style.strokeDashoffset = outlineLength

  play.addEventListener('click', () => {
    if (song.paused) {
      song.play()
      video.play()
      play.src = './src/svg/pause.svg'
    } else {
      song.pause()
      video.pause()
      play.src = './src/svg/play.svg'
    }
  })

  timeSelect.forEach(button => {
    button.addEventListener('click', () => {
      fakeDuration = button.dataset.time
      timeDisplay.textContent = `${formatNumber(Math.floor(fakeDuration / 60))}:${formatNumber(Math.floor(fakeDuration % 60))}`
    })
  })

  sounds.forEach(button => {
    button.addEventListener('click', () => {
      song.src = button.dataset.sound
      video.src = button.dataset.video
    })
  })

  song.ontimeupdate = () => {
    let currentTime = song.currentTime
    let elapsed = fakeDuration - currentTime
    let seconds = Math.floor(elapsed % 60)
    let minutes = Math.floor(elapsed / 60)

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
    outline.style.strokeDashoffset = progress

    timeDisplay.textContent = `${formatNumber(minutes)}:${formatNumber(seconds)}`

    if (currentTime >= fakeDuration) {
      song.pause()
      song.currentTime = 0
      play.src = './src/svg/play.svg'
      video.pause()
    }
  }

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number
  }
}

app()