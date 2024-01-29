'use client'

import 'regenerator-runtime'

import SpeechRecognition, { useSpeechRecognition as _useSpeechRecognition } from 'react-speech-recognition'

interface useSpeechRecognitionProps {
  language?: 'en-US'
}

const useSpeechRecognition = ({ language = 'en-US' }: useSpeechRecognitionProps = {}) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = _useSpeechRecognition()

  const startListening = () => SpeechRecognition.startListening({ language, continuous: true })
  const stopListening = () => SpeechRecognition.stopListening()

  return { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening }
}

export default useSpeechRecognition
