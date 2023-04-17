import React from 'react'

const Image = ({ imageInfo, index }) => {
  return (
    <div className={`border-solid px-8 bg-white shadow-2xl rounded-lg`}>
      <div className=' text-2xl'>
        {imageInfo.name}
      </div>

      <div className='w-full'>
        <img src={imageInfo.generatedImage}></img>
      </div>

      <div className='py-5 break-words'>
        {imageInfo.prompt}
      </div>
    </div>
  )
}

export default Image