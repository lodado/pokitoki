export const getSpeech = (text: string) => {
  let voices: any[] = []

  if (!window.speechSynthesis) {
    throw new Error('error - speechSynthesis api is not supported')
  }

  // 디바이스에 내장된 voice를 가져온다.
  const setVoiceList = () => {
    voices = window.speechSynthesis.getVoices()
  }

  setVoiceList()

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    // voice list에 변경됐을때, voice를 다시 가져온다.
    window.speechSynthesis.onvoiceschanged = setVoiceList
  }

  const lang = 'en-US'
  const utterThis = new SpeechSynthesisUtterance(text)
  utterThis.lang = lang
  const voice = voices.find((elem) => elem.lang === lang || elem.lang === lang.replace('-', '_'))

  // 한국어 voice가 있다면 ? utterance에 목소리를 설정한다 : 리턴하여 목소리가 나오지 않도록 한다.
  if (voice) {
    utterThis.voice = voice
  } else {
    return
  }

  utterThis.onpause = (event) => {
    const char = event.utterance.text.charAt(event.charIndex)
    console.log(`Speech paused at character ${event.charIndex} of "${event.utterance.text}", which is "${char}".`)
  }

  utterThis.rate = 0.7 // Slower speech rate (default is 1)
  utterThis.pitch = 0.8 // Softer pitch (default is 1)

  window.speechSynthesis.speak(utterThis)
}
