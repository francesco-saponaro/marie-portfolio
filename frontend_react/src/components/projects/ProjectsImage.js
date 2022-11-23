import React from 'react'

// Styles imports
import './Projects.scss'

// Card image component
const ProjectsImage = ({ image }) => {
  return (
    <div className='projects__card--image'>
        <img src={image} alt="project" />
    </div>
  )
}

export default ProjectsImage