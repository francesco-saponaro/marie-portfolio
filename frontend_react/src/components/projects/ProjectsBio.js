import React from 'react';
import { Link } from 'react-router-dom';

// Styles imports
import './Projects.scss';
import { BsArrowRight } from 'react-icons/bs';

// Card bio component
const ProjectsBio = ({ date, title, description, projectPageId }) => {
  return (
    // Card bio
    <div className='projects__card--bio'>
      {/* Date and title container */}
      <div className='projects__card--bio-dateandtitle'>
        {/* Date */}
        <div className='projects__card--bio-date'>
          {date}
        </div>
        {/* Title */}
        <h2 className='projects__card--bio-title'>
          {title}
        </h2>
      </div>

      {/* Details and CTA container */}
      <div className='projects__card--bio-detailsandcta'>
        {/* Details */}
        <div className='projects__card--bio-details'>
          {description}
        </div>
        {/* Cta */}
        <div className='projects__card--bio-cta links'>
          <Link to={`/project/${projectPageId}`}>
            View
            <BsArrowRight className='projects__card--bio-cta-icon' /> 
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectsBio