'use client'

import React, { PropsWithChildren, useEffect, useState } from 'react'

const Splash = ({ children }: PropsWithChildren) => {
  const [isVisible, setVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, 2000)
  }, [])

  return (
    <>
      {isVisible ? (
        <div className="absolute w-full h-full flex justify-center items-center z-[100] overflow-y-hidden overscroll-none bg-red-500">
          splash test
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default Splash
