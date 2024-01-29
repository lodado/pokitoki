'use client'

import Script from 'next/script'
import React from 'react'

const GA_KEY = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

const GA = () => {
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_KEY}`} />
      <Script id="ga-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_KEY}');
        `}
      </Script>
    </>
  )
}

export default GA
