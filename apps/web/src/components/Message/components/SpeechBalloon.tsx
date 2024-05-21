import React from 'react'

export const SpeechBalloon = (props: any) => {
  return (
    <svg
      width="15px"
      height="12px"
      viewBox="0 0 30 10"
      preserveAspectRatio="none"
      style={{
        fill: 'white',
        filter: 'drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 3px)',
        clipPath: 'inset(0px -10px -10px)',

        display: 'block',
        zIndex: 5,
      }}
      {...props}
    >
      <polygon points="0,0 30,0 15,10" />
    </svg>
  )
}
