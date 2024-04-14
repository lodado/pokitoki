import * as React from 'react'

const ICON_LOCK = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.22417 14.2223H11.7765C12.8198 14.2223 13.3337 13.8077 13.3337 12.8905V8.18537C13.3337 7.35616 12.9132 6.93527 12.0412 6.86617V5.31454C12.0412 2.92742 10.0714 1.77783 8.00033 1.77783C5.92928 1.77783 3.95945 2.92742 3.95945 5.31454V6.88502C3.14972 6.98553 2.66699 7.40013 2.66699 8.18537V12.8905C2.66699 13.8077 3.18086 14.2223 4.22417 14.2223ZM5.45434 5.20147C5.45434 3.73778 6.60665 3.11117 8.00033 3.11117C9.38621 3.11117 10.5463 3.73778 10.5463 5.20147V6.85361L5.45434 6.85989V5.20147Z"
        fill="#101828"
      />
    </svg>
  )
}

export default ICON_LOCK
