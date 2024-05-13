import React from 'react'

const Logo = ({ title }: { title?: string }) => {
  if (!title) return ''

  const middle = Math.floor(title.length / 2)
  const firstPart = title.substring(0, middle)
  const secondPart = title.substring(middle)

  return (
    <div className="w-[75px] font-bold font-['Binggrae-two'] text-center">
      <span className="text-black">{firstPart}</span>
      <span className="text-yellow-500">{secondPart}</span>
    </div>
  )
}

export default Logo
