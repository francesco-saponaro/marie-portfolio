import React from 'react'

// Styles imports
import './Project.scss'
import { BsArrowRight } from 'react-icons/bs'

// Component Imports
import TextToSplit from '../utils/TextToSplit';

// Sanity imports
import { urlFor } from '../../client'

// Project page hero component
const ProjectHero = ({ projectPageHero }) => {
  return (
    <div className='project__hero'>
      <div className='project__hero--dateandtitle'>
        {/* Date */}
        <div className='project__hero--dateandtitle--date'>
          {projectPageHero?.projectpagedate}
        </div>
        {/* Title */}
        <div className='project__hero--dateandtitle--title'>
          <TextToSplit target={projectPageHero?.projectpagetitle} className={'hero__header'} />
        </div>
      </div>
      {/* Roles */}
      <div className='project__hero--roles'>
        <div className='animation-container'>
          <div className='project__hero--roles--title'>
            Role
          </div>
          <ul className='project__hero--roles--content'>
            {projectPageHero?.projectpagerolelist.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Type */}
      <div className='project__hero--type'>
        <div className='animation-container'>
          <div className='project__hero--type--title'>
            Type
          </div>
          <div className='project__hero--type--content'>
            {projectPageHero?.projectpagetypelist[0]}
          </div>
        </div>
      </div>
      {/* Cta */}
      <div className='project__hero--cta links'>
        <div className='animation-container'> 
          <a href={projectPageHero?.projectpageurl} target="_blank">See website</a>
          <BsArrowRight />
        </div>
      </div>
      {/* Image */}
      <div className='project__hero--image'>
        <img src={urlFor(projectPageHero?.projectpageimage.image)} alt={projectPageHero?.projectpageimage.alt} />
      </div>
      {/* Overview */}
      <div className='project__hero--overview'>
        <div className='animation-container'> 
          {projectPageHero?.projectpagedescription[0].children[0].text}
        </div>
      </div>
      {/* Goals */}
      <div className='project__hero--goals'>
        <div className='animation-container'>
          <div className='project__hero--goals--title'>
            Goals
          </div>
          <ul className='project__hero--goals--content'>
            {projectPageHero?.projectpagegoalslist.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Deliverables */}
      <div className='project__hero--deliverables'>
        <div className='animation-container'>
          <div className='project__hero--deliverables--title'>
            Deliverables
          </div>
          <ul className='project__hero--deliverables--content'>
            {projectPageHero?.projectpagedeliverableslist.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProjectHero