import React from 'react'

// Alt mode background div component
const FlexBackground = ({ altMode }) => {
  return (
    <div className='flex-background'>
        {[...Array(21)].map((item, index) => (
        <div key={index}
            className={`flex-background__line ${altMode ? "line-transform line-open" : ""}`} 
            style={{ transitionDelay: `${index * 0.03}s`}}
        />
        ))}
    </div>
  )
}

export default FlexBackground