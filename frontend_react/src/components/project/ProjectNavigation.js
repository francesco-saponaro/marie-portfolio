import React, { useState, useEffect } from 'react';

// Router imports
import { Link } from 'react-router-dom'

// Styles imports
import './Project.scss'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'

// Sanity imports
import { client } from '../../client'

// Project page navigation component
const ProjectNavigation = ({ projectPageId }) => {
  
    const [projectIds, setProjectIds] = useState();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
    
        const projectsIdsQuery = `*[_type == "projects"] | order(projectdate asc) { projectpage->{_id}}`;
        client.fetch(projectsIdsQuery, { signal: signal }).then((data) => {
          setProjectIds(data.map(item => item.projectpage._id));
        })
    
        // Clean up
        return () => {
          controller.abort();
        }
    }, [])

    return (
        projectIds &&
        <div className='project__navigation' style={{ justifyContent: projectIds.indexOf(projectPageId) === 0 && "flex-end" }}>
            {/* Prev */}
            {projectIds.indexOf(projectPageId) !== 0 &&
                <Link to={`/project/${projectIds[projectIds.indexOf(projectPageId) -1]}`} className='project__navigation--prev links'>
                <div className='project__navigation--prev--first first-text'>
                    Previous
                </div>
                <div className='project__navigation--prev--second second-text'>
                    <BsArrowLeft className='project__navigation--prev--icon' /> 
                    work 
                </div>
                </Link>
            }
            {/* Next */}
            {projectIds.indexOf(projectPageId) !== projectIds.length - 1 &&
                <Link to={`/project/${projectIds[projectIds.indexOf(projectPageId) +1]}`} className='project__navigation--next links'>
                <div className='project__navigation--next--first first-text'>
                    Next
                </div>
                <div className='project__navigation--next--second second-text'>
                    work 
                    <BsArrowRight className='project__navigation--next-icon' /> 
                </div>
            </Link>
            }
        </div>
    )
}

export default ProjectNavigation