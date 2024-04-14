import * as React from 'react'

const ICON_CHARTLINE = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.25 11.375H1.75V2.625" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12.25 5.25L8.75 8.3125L5.25 5.6875L1.75 8.75"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ICON_CHARTLINE
