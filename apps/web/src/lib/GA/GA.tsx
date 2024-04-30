import { headers } from 'next/headers'
import Script from 'next/script'
import React from 'react'

import { GA_KEY } from './constant'
import GAClient from './GAClient'

const GA = () => {
  const nonce = headers().get('x-nonce')!

  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_KEY}`} nonce={nonce} />
      <GAClient nonce={nonce} />
    </>
  )
}

export default GA
