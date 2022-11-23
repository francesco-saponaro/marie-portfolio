import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'

// Router imports
import { Routes, Route, useLocation } from 'react-router-dom'

// Styles imports
import './App.scss';

// Component Imports
import { Navbar, FlexBackground, BackToTop } from './components'
import { HomePage, Project, NotFound } from './containers'
import Loader from './components/utils/Loader'

// Utils imports
import { useToggleScrollBar, useScrollPosition } from './helpersAndHooks';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Sanity imports
import { client } from './client'

const App = () => {

  // NAVBAR AND FOOTER LINKS SANITY BACKEND STATES AND QUERY
  const [socialLinks, setSocialLinks] = useState([]);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const socialsQuery = '*[_type == "socials"]{ socialname, socialurl, fileboolean, fileupload{asset->{path,url}} }';
    client.fetch(socialsQuery, { signal: signal }).then((data) => {
      setSocialLinks(data);
      setEmail(data.filter(item => item.socialname === "Contact")[0])
    });

    // Clean up
    return () => {
      controller.abort();
    }
  }, []);

  // Register Gsap ScrollTrigger plugin for the app
  gsap.registerPlugin(ScrollTrigger);

  // Refs to be passed to both nav and other components.
  // Needed for both scrolling to them and GSAP animations.
  const worksSection = useRef(null);
  // Refs to be passed to both nav and container enclosing the GSAP pinned section.
  // Needed for scrolling to it instead of the GSAP pinned component itself, since a GSAP pinned component 
  // conflicts with its scroll position.
  const credAndFooterContainerSection = useRef(null);

  // State toggling alt-mode layout
  let [altMode, setAltMode] = useState(false)

  // State storing scroll position, set by useScrollPosition custom hook below
  // Needed for app parallaxes and other cases
  let [scrollPosition, setScrollPosition] = useState(null)
  useScrollPosition(setScrollPosition)

  // Custom hook toggling scrollbar display on scroll
  useToggleScrollBar();

  // Loading boolean state,toggled to true when changing location and false once gsap 
  // loader animation is complete
  const [loader, setLoader] = useState(null);

  // Use location hook to detect when we are changing path to activate loader
  let location = useLocation();
  // Boolean state passed to the nav menu which will tell the app if we are navigating from project page nav menu
  // to a homepage section
  let [navToSectionBoolean, setNavToSectionBoolean] = useState(false);
  
  // Loader params
  useLayoutEffect(() => {
    // If we are not navigating from project page menu to a homepage section, then start loader
    if(!navToSectionBoolean) setLoader(true)
  }, [location])

  return (
    // If loading show loader otherwise route
    loader ? 
    // Loader component
    <Loader setLoader={setLoader} loader={loader} altMode={altMode} /> 
    :
    /* App container */
    <div className={`App ${altMode ? "alt-mode" : ""}`}>     
        {/* alt mode background component */}
        <FlexBackground altMode={altMode} />
        {/* Back to top/Scroll progress component */}
        <BackToTop />
        {/* Routes components */}
        <Routes>
          {/* Routes with Navbar */}
          <Route path="/" 
                element={<Navbar altMode={altMode} 
                                  setAltMode={setAltMode}
                                  setNavToSectionBoolean={setNavToSectionBoolean}
                                  socialLinks={socialLinks && socialLinks}
                                  email={email && email}
                                  worksSection={worksSection} 
                                  credAndFooterContainerSection={credAndFooterContainerSection} />}>
            <Route index 
                  element={<HomePage altMode={altMode} 
                                      scrollPosition={scrollPosition}
                                      socialLinks={socialLinks && socialLinks}
                                      email={email && email}
                                      worksSection={worksSection} 
                                      credAndFooterContainerSection={credAndFooterContainerSection} />} />
            <Route path="/project/:projectId" element={<Project  />} />
          </Route>
          {/* Routes without Navbar */}
          <Route path="*" element={<NotFound />} />
        </Routes>  
    </div>
  )
}

export default App;
