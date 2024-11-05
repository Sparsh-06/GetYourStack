import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const profile = () => {
  return (
    <div className='flex h-screen items-center justify-center'><UserProfile/></div>
  )
}

export default profile