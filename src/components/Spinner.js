import React from 'react'
import loading from './loading.svg'

const Spiner = () => {
  return (
    <div className='text-center'>
      <img style={{width:"50px",height:"50px"}} src={loading} alt="Loading" />
    </div>
  )
}

export default Spiner
