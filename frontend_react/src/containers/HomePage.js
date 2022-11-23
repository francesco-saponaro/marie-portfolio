import React, { useRef, useState, useEffect } from 'react';

// Component Imports
import { Hero, Projects, Credentials, Footer } from "../components"
import { Helmet } from "react-helmet";

// Sanity imports
import { client } from '../client'

// Home page component
const HomePage = ({ altMode, worksSection, credAndFooterContainerSection, socialLinks, email }) => {

  // HOMEPAGE SANITY BACKEND STATES AND QUERIES
  const [heroData, setHeroData] = useState();
  const [projectsData, setProjectsData] = useState();
  const [credData, setCredData] = useState();
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const heroQuery = '*[_type == "hero"]{ heroheaders, herobio[0], heroimage }';
    const projectsQuery = '*[_type == "projects"] | order(projectdate asc)';
    const credQuery = '*[_type == "credentials"]';

    let hero = client.fetch(heroQuery, { signal: signal });
    let projects = client.fetch(projectsQuery, { signal: signal });
    let credentials = client.fetch(credQuery, { signal: signal });

    Promise.all([
      hero,
      projects,
      credentials
    ]).then((data) => {
      setHeroData(data[0][0]);
      setProjectsData(data[1]);
      setCredData(data[2][0]);
      setLoading(false);
    }).catch((error) => {
      console.log(error)
    });

    // Clean up
    return () => {
      controller.abort();
    }
  }, []);

  // Refs, to be assigned to parent container and gsap.context(), which will allow us to
  // select all descendants of the parent, inside the context, without having to create
  // a Ref for every single one.
  const pinnedRef = useRef();
  const credentialsSection = useRef();

  return (
    !loading &&
      <>
      {/* Home Page title metadata */}
      <Helmet><title>Marie's Portfolio</title></Helmet>

      {/* Hero section */}
      <Hero worksSection={worksSection} loading={loading} heroData={heroData && heroData} />

      {/* Projects section */}
      <Projects altMode={altMode} worksSection={worksSection} loading={loading} projectsData={projectsData && projectsData} />
      
      {/* Div enclosing the 'layered-bottom' GSAP pinned section, Needed for scrolling to it instead 
      of the GSAP pinned component itself, since a GSAP pinned component conflicts with its scroll position. */}
      <div ref={credAndFooterContainerSection}>
        {/* Sections with a layered bottom pinning effect */}
        <div className='layered-bottom' ref={pinnedRef}>
          <Credentials altMode={altMode} pinnedRef={pinnedRef} credentialsSection={credentialsSection} loading={loading} credData={credData && credData} />
          <Footer altMode={altMode} credentialsSection={credentialsSection} email={email && email} socialLinks={socialLinks} loading={loading} />
        </div>
      </div>
      </>
  )
}

export default HomePage

