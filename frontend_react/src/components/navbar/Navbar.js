import React, { useState, useRef, useEffect } from 'react'

// Router imports
import { Outlet } from 'react-router-dom'

// Styles imports
import './Navbar.scss'

// Component Imports
import Nav from './Nav'

// Utils imports
import { useScrollPosition } from '../../helpersAndHooks'

// Navbar component
const Navbar = ({ altMode, 
                  setAltMode, 
                  setNavToSectionBoolean, 
                  worksSection, 
                  credAndFooterContainerSection, 
                  socialLinks, 
                  email }) => {

  // State and ref to which the useScrollPosition custom hook will
  // assign the current and previous window vertical offset, 
  // needed to determine when to hide and show the navbar.
  let [scrollPosition, setScrollPosition] = useState(false);
  const previousScrollRef = useRef();
  useScrollPosition(setScrollPosition, scrollPosition, previousScrollRef);

  return (
    <>
      <Nav scrollPosition={scrollPosition} 
           previousScrollRef={previousScrollRef} 
           altMode={altMode} 
           setAltMode={setAltMode}
           setNavToSectionBoolean= {setNavToSectionBoolean}
           email={email}
           socialLinks={socialLinks}
           worksSection={worksSection} 
           credAndFooterContainerSection={credAndFooterContainerSection}/>
      <Outlet />
    </>
  )
}

export default Navbar