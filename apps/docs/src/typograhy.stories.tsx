import React from 'react'
import { TYPOGRAPHY } from 'shared'

export default {
  title: 'Design System/Typography',
  // You might not need parameters, but if you do, they go here
}

const TypographySample = ({ style, label }: any) => (
  <div style={{ ...style, width: '100%', height: '150px' }}>{label}: The quick brown fox jumps over the lazy dog</div>
)

export const TypographyStyles = () => (
  <div>
    {Object.entries(TYPOGRAPHY).map(([key, style]) => (
      <TypographySample key={key} style={style} label={key} />
    ))}
  </div>
)

// This will render a list of divs, each applying one of the typography styles to the sample text.
