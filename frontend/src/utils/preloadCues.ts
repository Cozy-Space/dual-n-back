export const audioCues = [
  '/audio/positiveJingle.mp3',
  '/audio/negativeJingle.mp3',
  '/audio/a1.mp3',
  '/audio/a2.mp3',
  '/audio/a3.mp3',
  '/audio/a4.mp3',
  '/audio/a5.mp3',
  '/audio/a6.mp3',
  '/audio/a7.mp3',
  '/audio/a8.mp3',
  '/audio/a9.mp3',
  '/audio/a10.mp3'
]

export const imageCues = [
  '/images/a1.jpg',
  '/images/a2.jpg',
  '/images/a3.jpg',
  '/images/a4.jpg',
  '/images/a5.jpg',
  '/images/a6.jpg',
  '/images/a7.jpg',
  '/images/a8.jpg',
  '/images/a9.jpg',
  '/images/a10.jpg',
  '/images/a11.jpg',
  '/images/a12.jpg',
  '/images/a13.jpg',
  '/images/a14.jpg',
  '/images/a15.jpg',
  '/images/a16.jpg',
  '/images/a17.jpg',
  '/images/a18.jpg',
  '/images/a19.jpg',
  '/images/a20.jpg',
  '/images/instructions1.jpg',
  '/images/instructions2.jpg',
  '/images/instructions3.jpg',
  '/images/negativeSmiley.png',
  '/images/positiveSmiley.png'
]

export async function preloadCues(audioCues: string[], imageCues: string[]) {
  await Promise.all([preloadImages(imageCues), preloadSounds(audioCues)])
}

function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = resolve
    img.onerror = reject
  })
}

function preloadImages(sources: string[]) {
  return Promise.all(sources.map(preloadImage))
}

function preloadSound(src: string) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src)
    audio.oncanplaythrough = resolve
    audio.onerror = reject
  })
}

function preloadSounds(sources: string[]) {
  return Promise.all(sources.map(preloadSound))
}
