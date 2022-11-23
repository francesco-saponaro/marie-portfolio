import React, { useLayoutEffect } from 'react'

// Styles imports
import './Projects.scss'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Component Imports
import ProjectsImage from './ProjectsImage'
import ProjectsBio from './ProjectsBio'

// Sanity imports
import { urlFor } from '../../client'

// Projects horizontal scroller component
const Projects = ({ worksSection, projectsData, loading }) => {

  // Gsap scroll animations
  useLayoutEffect(() => {
    // Wait for backend data to have loaded
    if(!loading) {
    let ctx = gsap.context(() => {
      // Section background color //#b7410e
      gsap.to(worksSection.current, {
        backgroundColor: "#AB7D00", 
        ease: 'none',
        duration: .5,
        scrollTrigger: {
          start: 'top top', 
          trigger: ".projects__container",
          toggleActions: 'play reverse play reverse',
          invalidateOnRefresh: true,
          fastScrollEnd:true,
          end: () => `+=${document.querySelector(".projects__container").offsetWidth}`
        }
      });

      // horizontal scroll
      const sections = gsap.utils.toArray('.projects__card'); // Divs to target
      let horizontalScroll = gsap.to(sections, { // function
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          start: 'top top', // when the top of the trigger hits the top of the viewport
          trigger: ".projects__container", // trigger container
          pin: true, // pin the trigger element while active, meaning it will appear to "stick" in its starting position while the rest of the content continues scrolling underneath it.
          scrub: 0.5, // smooth scrubbing, takes 0.5 second to "catch up" to the scrollbar
          snap: {
                  snapTo: 1 / (sections.length - 1), 
                  inertia: false,
                  onStart: () => {
                    document.querySelector('.progress__btt-icon').style.opacity = 0;
                    document.querySelector('.progress__btt-icon').style.cursor = "default";
                  },
                  onComplete: () => {
                    document.querySelector('.progress__btt-icon').style.opacity = 1;
                    document.querySelector('.progress__btt-icon').style.cursor = "pointer";
                  },
                }, // Allows you to snap to certain progress values (between 0 and 1) after the user stops scrolling
          invalidateOnRefresh: true, // Resets value on refresh , most likely resizes
          fastScrollEnd: true,
          onEnter: () => document.querySelector('.nav').style.opacity = 0, // Callbacks to hide menu when in view
          onEnterBack: () => document.querySelector('.nav').style.opacity = 0,  
          onLeave: () => {
            document.querySelector('.nav').style.opacity = 1; // Callbacks to hide menu when in view and showing btt button 
            document.querySelector('.progress__btt-icon').style.opacity = 1; // if hidden by snap
            document.querySelector('.progress__btt-icon').style.cursor = "pointer";
          },
          onLeaveBack: () => {
            document.querySelector('.nav').style.opacity = 1;
            document.querySelector('.progress__btt-icon').style.opacity = 1;
            document.querySelector('.progress__btt-icon').style.cursor = "pointer";
          },
          end: () => `+=${document.querySelector(".projects__container").offsetWidth}`, // end after scrolling beyond the width of the trigger container,
        },
      });

      // Cards scale and opacity
      let cards = gsap.utils.toArray('.projects__card--container');
      gsap.set(cards.slice(1), { scale: .7, opacity: .5 });
      cards.forEach((card, i) => {
        gsap.to(card, {
          scale: i === 0 ? .7 : 1,
          opacity: i === 0 ? .5 : 1,
          ease: 'none',
          duration: .5,
          scrollTrigger: {
            start: `${i === 0 ? "center" : "left"} center`, 
            end: 'right center',
            trigger: card,
            toggleActions: i === 0 ? `none play reverse none` : i === cards.length - 1 ? `play none none reverse` : `play reverse play reverse`,
            containerAnimation: horizontalScroll,
            invalidateOnRefresh: true
          }
        })
      });
    }, worksSection) // Ref assigned to parent container and gsap.context(), which will allow us to
                     // select all descendants of the parent, inside the context, without having to create
                     // a Ref for every single one.

    // Recalculates the positioning of all of the ScrollTriggers on the page
    ScrollTrigger.refresh(); 

    // Clean up
    return () => {
      ctx.revert();
    }
    }
  }, [loading])

  return (
    !loading &&
    // Projects slider section
    <section id="projects-section" className='projects' ref={worksSection}>
      <div className='projects__container'>
          {/* Projects cards  */}
          {projectsData?.map((card, index) => (
            <div key={index} className='projects__card'>
              <div className='projects__card--container'>
                <ProjectsImage image={urlFor(card.projectimage.image)} />
                <ProjectsBio date={card.projectdate} 
                             title={card.projecttitle} 
                             description={card.projectdescription[0].children[0].text}
                             projectPageId={card.projectpage._ref}  />
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default Projects