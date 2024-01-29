import React, { useEffect } from 'react'

const useInitTTS = () => {
  React.useEffect(() => {
    window.speechSynthesis?.getVoices()
  }, [])
}

export default useInitTTS
