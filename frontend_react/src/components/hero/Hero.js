import React, { useRef, useLayoutEffect }  from 'react'

// Styles imports
import './Hero.scss'
import { BsArrowDownRight, BsArrowDown } from 'react-icons/bs';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// utils imports
import { scrollTo, gsapAnimateFrom } from '../../helpersAndHooks'

// Component Imports
import { TextToSplit } from '../../components'

// Sanity imports
import { urlFor } from '../../client'

// Hero component
const Hero = ({ worksSection, heroData, loading }) => {

  // Ref to be assigned to parent container and gsap.context(), which will allow us to
  // select all descendants of the parent, inside the context, without having to create
  // a Ref for every single one.
  const heroSection = useRef();

  // Gsap Scroll animations
  useLayoutEffect(() => {
    // Wait for backend data to have loaded
    if(!loading) {
    let ctx = gsap.context(() => {
      // Image parallax
      gsap.utils.toArray(".hero__image .hero__image-img").forEach((section, i) => {
        const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;
        gsap.fromTo(section,{ 
          y: () => heightDiff
        }, {
          scrollTrigger: {
            trigger: section.parentElement,
            scrub: true
          },
          y: 0,
          ease: "none"
        });
      });

      // First headers translateY and image clip path timeline
      gsap.set([".split-text-hero-header.first", ".split-text-hero-header.second"], { yPercent: 130 });
      let firstHeroHeaderAndImage = gsap.timeline();
      firstHeroHeaderAndImage.to(".split-text-hero-header.first", {
        yPercent: 0,
        ease: "power4.out",
        stagger: 0.06,
        delay:.1
      });
      firstHeroHeaderAndImage.to(".split-text-hero-header.second", {
        yPercent: 0,
        ease: "power4.out",
        stagger: 0.06
      }, "<");
      firstHeroHeaderAndImage.to('.hero__image', { 
        clipPath: "polygon(100% 100%, 0 100%, 0 0, 100% 0)",
        ease: "expo"
      }, "-=.80");
 
      // Second headers translateY
      gsap.set([".split-text-hero-header-second.first", ".split-text-hero-header-second.second"], { yPercent: 130 });
      let secondHeaders = gsap.timeline({
        defaults: { yPercent: 0, ease: "power4.out", stagger: 0.06, },
        scrollTrigger: {
          trigger: '.split-text-hero-header-second.first'
        }
      });
      secondHeaders.to(".split-text-hero-header-second.first", { delay: .1 })
      secondHeaders.to(".split-text-hero-header-second.second", {}, "<");

      // Apply these Gsap animations after a millisecond, as if doing it on component mount
      // the function associated to these animations doesnt run on time on all .animation-container elements 
      setTimeout(() => {
        // Hero text opacity and translateY - scroll direction dependent
        gsap.utils.toArray(".hero__about--text").forEach((elem) => {
          gsap.set(elem, { autoAlpha: 0 }); // assure that the element is hidden when scrolled into view
          ScrollTrigger.create({
            trigger: elem,
            onEnter: () => gsapAnimateFrom(elem, 1), 
            onEnterBack: () => gsapAnimateFrom(elem, -1),
            onLeave: () => gsap.set(elem, {autoAlpha: 0}) // assure that the element is hidden when scrolled out of view
          })
        });
      },100)

      // Hero CTA opacity and translateX
      gsap.set([".hero__cta--first", ".hero__cta--second"], { autoAlpha: 0 });
      let ctaTl = gsap.timeline({
        defaults: { 
          ease: "power2", 
          duration: 1,
        },
        scrollTrigger: {
          trigger: '.hero__cta',
          toggleActions: 'play reset play reset'
        }
      });
      ctaTl.fromTo('.hero__cta--first', { autoAlpha: 0, x: -60,}, { autoAlpha: 1, x: 0, delay: .05, });
      ctaTl.fromTo('.hero__cta--second', { autoAlpha: 0, x: 60,}, { autoAlpha: 1, x: 0 }, "<");
    }, heroSection)
  
    // Recalculates the positioning of the ScrollTrigger on the page
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      ctx.revert()
    }
  }
  }, [loading])

  return (
    !loading &&
    // Hero section
    <section className='hero' ref={heroSection}>
     {/* First header */}
     <div className='hero__header-first'>
      {/* Text */}
      <div className='hero__header-first--text'>
        <TextToSplit target={heroData?.heroheaders[0].firststring} className={'split-text-hero-header first'} />
      </div>
      {/* Text */}
      <div className='hero__header-first--text'>
        <TextToSplit target={heroData?.heroheaders[0].secondstring} className={'split-text-hero-header second'} />
      </div>
     </div>

     {/* Parallax Hero Image */}
     <div className='hero__image'>
      <img className='hero__image-img' src={urlFor(heroData?.heroimage.image)} alt={heroData.heroimage.alt} />
     </div>

     {/* About text */}
     <div className='hero__about'>
      <div className='hero__about--text'>
        {heroData?.herobio.children[0].text}
      </div>
     </div>

     {/* Works CTA */}
     <div className='hero__cta links' onClick={() => scrollTo(worksSection)}>
      <div className='hero__cta--first'>
        Selected
      </div>
      <div className='hero__cta--second'>
        work 
        <BsArrowDownRight className='hero__cta--down-right-icon' /> 
        <BsArrowDown className='hero__cta--down-icon' />
      </div>
     </div>

     {/* Second header */}
     <div className='hero__header-second'>
      {/* Text */}
      <div className='hero__header-second--text'>
        <TextToSplit target={heroData?.heroheaders[1].firststring} className={'split-text-hero-header-second first third'} />
      </div>
      {/* Text */}
      <div className='hero__header-second--text'>
        <TextToSplit target={heroData?.heroheaders[1].secondstring} className={'split-text-hero-header-second second fourth'} />
      </div>
     </div>
    </section>
  )
}

export default Hero