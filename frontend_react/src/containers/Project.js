import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Styles imports
import '../components/project/Project.scss'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Component Imports
import { ProjectBlock, ProjectHero, ProjectNavigation } from "../components"
import { Helmet } from "react-helmet";

// Utils Imports
import { gsapAnimateFrom } from '../helpersAndHooks'

// Sanity imports
import { client } from '../client'

// Project page component
const Project = () => {

  // HOMEPAGE SANITY BACKEND STATES AND QUERIES
  // Get project id from params
  let { projectId } = useParams();

  // Navigate hook to navigate to home page if project not found
  const navigate = useNavigate();

  const [projectPageHero, setProjectPageHero] = useState();
  const [projectPageBlocks, setProjectPageBlocks] = useState();
  const [projectPageLoading, setProjectPageLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const projectPageQuery = `*[_id == "${projectId}"]`;
    client.fetch(projectPageQuery, { signal: signal }).then((data) => {
      const { projectpageblocks, ...projectpagehero } = data[0] // destructure object to extract blocks and hero section data separarately 
      setProjectPageHero(projectpagehero);
      setProjectPageBlocks(projectpageblocks);
      setProjectPageLoading(false);
    }).catch((error) => {
      navigate("/");
    });

    // Clean up
    return () => {
      controller.abort();
    }
  }, [])

  // Section ref
  const projectRef = useRef();

  // Gsap animations
  useLayoutEffect(() => {
    // Wait for backend data to have loaded
    if(!projectPageLoading) {
    let ctx = gsap.context(() => {
      // Project header and date translateY and image clip path timeline
      gsap.set('.hero__header', { yPercent: 130 });
      let headerAndImage = gsap.timeline();
      headerAndImage.to('.hero__header', {
        yPercent: 0,
        ease: "power4.out",
        stagger: 0.06,
        delay:.1
      });
      headerAndImage.fromTo('.project__hero--dateandtitle--date', {
        opacity: 0
      },{
        opacity:1,
        ease: "power4.out",
        delay:.1
      }, "<");
      headerAndImage.to('.project__hero--image', { 
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power4.in"
      }, "-=.70");

      // Hero image scale on scroll
      gsap.set('.project__hero--image img', { scale: 1.5 });
      gsap.to('.project__hero--image img', {
        scale: 1,
        scrollTrigger: {
          trigger: '.project__hero--image',
          scrub: true,
        }
      });

      // Apply these Gsap animations after a second, as if doing it on component mount
      // the function associated to these animations doesnt run on time on all .animation-container elements 
      setTimeout(() => {
        // Project page animations
        // Section text translate and opacity animations, scroll direction dependent
        gsap.utils.toArray(".animation-container").forEach((elem) => {
          gsap.set(elem, {autoAlpha: 0}); // assure that the element is hidden when scrolled into view
          
          ScrollTrigger.create({
            trigger: elem,
            onEnter: () => gsapAnimateFrom(elem, 1), 
            onEnterBack: () => gsapAnimateFrom(elem, -1),
          });
        });
    
        // Hero CTA opacity and translateX
        gsap.set([".first-text", ".second-text"], { autoAlpha: 0 });
        let ctaTl = gsap.timeline({
          defaults: { 
            ease: "power2", 
            duration: 1,
          },
          scrollTrigger: {
            trigger: '.project__navigation',
            toggleActions: 'play reset play reset'
          }
        });
        ctaTl.fromTo('.first-text', { autoAlpha: 0, x: -60,}, { autoAlpha: 1, x: 0, delay: .05, });
        ctaTl.fromTo('.second-text', { autoAlpha: 0, x: 60,}, { autoAlpha: 1, x: 0 }, "<");
      },1000)
    }, projectRef)

    // Recalculates the positioning of the ScrollTrigger on the page
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      ctx.revert()
    }
  }
  }, [projectPageLoading])

  return (
    !projectPageLoading &&
    <section className='project' ref={projectRef}>
      {/* Project Page title metadata */}
      <Helmet><title>{`${projectPageHero?.projectpagetitle} | Marie's Portfolio`}</title></Helmet>

      {/* Project hero */}
      <ProjectHero projectPageHero={projectPageHero && projectPageHero} />

      {/* Project blocks */}
      <ProjectBlock projectPageBlocks={projectPageBlocks && projectPageBlocks} />

      {/* Project navigation */}
      <ProjectNavigation projectPageId={projectPageHero?._id}  />
    </section>
  )
}

export default Project