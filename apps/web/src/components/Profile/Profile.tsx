import { Image, ImageProps } from '@custompackages/designsystem'
import React from 'react'

const Profile = (props: ImageProps) => {
  return <Image className="rounded-full" width={48} height={48} {...props} />
}

export default Profile
