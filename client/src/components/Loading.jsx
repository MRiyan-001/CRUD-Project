import React from 'react'

const Loading = () => {
  return (
    <div className='fixed bg-black/60 h-full w-full flex items-center justify-center top-0 left-0 z-100'>
        <div className='h-10 w-10 rounded-full border-4 border-gray-300 border-t-gray-500 animate-spin'></div>
    </div>
  )
}

export default Loading