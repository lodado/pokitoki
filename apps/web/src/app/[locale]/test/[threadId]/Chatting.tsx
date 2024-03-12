'use client'

import { useParams } from 'next/navigation'

const Chatting = () => {
  const { threadId } = useParams()
  return <div>{threadId}</div>
}

export default Chatting
