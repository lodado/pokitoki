import * as React from 'react'

const ICON_MANUAL = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.00033 1.3335C3.26699 1.3335 2.67366 1.9335 2.67366 2.66683L2.66699 13.3335C2.66699 14.0668 3.26033 14.6668 3.99366 14.6668H12.0003C12.7337 14.6668 13.3337 14.0668 13.3337 13.3335V5.88683C13.3337 5.5335 13.1937 5.1935 12.9403 4.94683L9.72033 1.72683C9.47366 1.4735 9.13366 1.3335 8.78033 1.3335H4.00033ZM8.66699 5.3335V2.3335L12.3337 6.00016H9.33366C8.96699 6.00016 8.66699 5.70016 8.66699 5.3335Z"
        fill="#101828"
      />
    </svg>
  )
}

export default ICON_MANUAL
