'use client'

import React, { useEffect, useState } from 'react'

import { useSpeechRecognition } from '@/lib/voice'

const Voice = ({ onChange }: any) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening } =
    useSpeechRecognition()

  useEffect(() => {
    onChange?.(transcript)
  }, [transcript])

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button type="button" onClick={startListening}>
        Start
      </button>
      <button type="button" onClick={stopListening}>
        Stop
      </button>
      <button type="button" onClick={resetTranscript}>
        Reset
      </button>
      <p>{transcript}</p>
    </div>
  )
}

export default Voice
