import React from 'react'

// Router imports
import { Link } from 'react-router-dom'

// Styles imports
import { BsArrowLeft } from 'react-icons/bs';

// 404 component
const NotFound = () => {
  return (
    <div className='not-found'>
      <div className='not-found__text'>
        Wrong path!
      </div>
      <div className='not-found__cta links'>
        <Link to="/" className='not-found__cta-link'>
          Go back
          <BsArrowLeft /> 
        </Link>
      </div>
    </div>
  )
}

export default NotFound