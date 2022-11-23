import React from 'react'

// utils imports
import { scrollTo } from '../../helpersAndHooks'

// Styles imports
import '../../App.scss';
import { motion, useScroll } from 'framer-motion';
import { BsArrowUp } from 'react-icons/bs';

// Back to top/Scroll progress component
const BackToTop = () => {

    const { scrollYProgress } = useScroll();

    return (
        <div className='progress'>
            {/* Scroll progress svg */}
            <svg id="progress" width="37.5" height="37.5" viewBox="0 0 37.5 37.5">
              <circle cx="18.75" cy="18.75" r="11.25" pathLength="1" className="bg" />
              <motion.circle
                cx="18.75"
                cy="18.75"
                r="11.25"
                pathLength="1"
                className="indicator"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
            {/* Back to top svg */}
            <BsArrowUp className="progress__btt-icon" onClick={() => scrollTo()} />
        </div>
    )
}

export default BackToTop