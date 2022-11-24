import React, { useEffect } from 'react'

// Styles imports
import './Credentials.scss'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Component Imports
import { FlexBackground, TextToSplit } from '../../components'

// Utils Imports
import { gsapAnimateFrom } from '../../helpersAndHooks'

// Credentials component
const Credentials = ({ altMode, pinnedRef, credentialsSection, credData, loading }) => {
  // GSAP scroll animations
  useEffect(() => {
    // Wait for backend data to have loaded
    if(!loading) {
    let ctx = gsap.context(() => {
      // Section layer pinning
      gsap.to(credentialsSection.current, {
        yPercent: -100,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: pinnedRef.current,
          start: "top top",
          scrub: true,
          pin: true
        }
      })
      gsap.set(credentialsSection.current, {zIndex: (i, target, targets) => targets.length - i});

      // Apply these Gsap animations after a second, as if doing it on component mount
      // the function associated to these animations doesnt run on time on all .animation-container elements 
      setTimeout(() => {
        // Section text translate and opacity animations, scroll direction dependent
        gsap.utils.toArray(".reveal-text").forEach((elem) => {
          gsap.set(elem, {autoAlpha: 0}); // assure that the element is hidden when scrolled into view
          
          ScrollTrigger.create({
            trigger: elem,
            onEnter: () => gsapAnimateFrom(elem, 1), 
            onEnterBack: () => gsapAnimateFrom(elem, -1),
            onLeave: () => gsap.set(elem, {autoAlpha: 0}) // assure that the element is hidden when scrolled out of view
          });
        });

        gsap.utils.toArray(".reveal-header").forEach((elem) => {
          gsap.set(elem, {autoAlpha: 0}); // assure that the element is hidden when scrolled into view
          
          ScrollTrigger.create({
            trigger: elem,
            onEnter: () => gsapAnimateFrom(elem, 1, .5), 
            onEnterBack: () => gsapAnimateFrom(elem, -1, .5),
            onLeave: () => gsap.set(elem, {autoAlpha: 0}) // assure that the element is hidden when scrolled out of view
          });
        });

        // Hr scale
        gsap.fromTo('.credentials__hr', { 
          scale: 0
          }, { 
          scale: 1,
          ease: "power2", 
          duration: 1,
          scrollTrigger: {
            trigger: '.credentials__hr',
            toggleActions: 'play reset play reset'
          }
        });
      },1000)
    }, credentialsSection)

    // Recalculates the positioning of the ScrollTrigger on the page
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      ctx.revert();
    }
    }
  }, [loading])

  return (
    !loading &&
    <section id="credentials-section" className='credentials layered-bottom__panel' ref={credentialsSection}>

      {/* alt mode background component */}
      <FlexBackground altMode={altMode} />

      {/* Container */}
      <div className='credentials__container'>
        {/* Info */}
        <div className='credentials__info'>
          {/* Info header */}
          <div className='credentials__info--header'>
            <TextToSplit target={credData?.credentialsheader} className={'reveal-header'} lineHeight={1.2} />
          </div>
          {/* Info text */}
          <div className='credentials__info--text'>
            <div className='reveal-text'>
              {credData?.credentialssubheader[0].children[0].text}
            </div>
          </div>
        </div>

        <hr className='credentials__hr' />

        {/* Approach */}
        <div className='credentials__approach'>
          {/* Skills panels*/}
          {credData?.credentialsskills.map((item, index) => (
            <div key={index} className='credentials__approach--panel'>
              {/* Panel header */}
              <div className='credentials__approach--panel__header'>
                <TextToSplit target={item.skillheader} className={'reveal-header'} lineHeight={1.2} />
              </div>
              {/* Panel text */}
              <div className='credentials__approach--panel__text'>
                <div className='reveal-text'>
                  {item.skilltext[0].children[0].text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Credentials