import React, { useEffect, useRef } from 'react'

// Styles imports
import './Footer.scss'
import { BsArrowUpRight } from 'react-icons/bs';
import gsap from 'gsap';

// Component Imports
import { FlexBackground, TextToSplit } from '../../components'

// Footer component
const Footer = ({ altMode, credentialsSection, socialLinks, email, loading }) => {

    // Ref to be assigned to parent container and gsap.context(), which will allow us to
    // select all descendants of the parent, inside the context, without having to create
    // a Ref for every single one.
    const footerSection = useRef();
    
    // GSAP scroll animations
    useEffect(() => {
      // Wait for backend data to have loaded
      if(!loading) {
      let ctx = gsap.context(() => {
        // Footer color
        gsap.to(footerSection.current, {
          backgroundColor: "#0f141e",
          y: '0',
          ease: "power1",
          scrollTrigger: {
            trigger: credentialsSection.current,
            start: "top top",
            scrub: true
          }
        })

        // Alt bg footer color
        gsap.to(".flex-background__line", {
          backgroundColor: "#e1dfdd",
          ease: "power1",
          scrollTrigger: {
            trigger: credentialsSection.current,
            start: "top top",
            scrub: true
          }
        })

        // Footer split text translate
        gsap.from(".split-text-footer", {
          yPercent: 130,
          ease: "back.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: ".footer__social",
            start: "top 50%",
            end: "bottom 6%",
            scrub: 1.1
          }
        })
      }, footerSection)
  
      // Clean up
      return () => {
        ctx.revert();
      }
      }
    }, [loading])

    return (
        // Footer section
        <section className='footer layered-bottom__panel tests' ref={footerSection}>
            {/* alt mode background component */}
            <FlexBackground altMode={altMode} />  

            {/* CTA */}
            <div className='footer__cta'>
                {/* CTA question */}
                <div className='footer__cta--q'>
                    <TextToSplit target={"Have a project in mind?"} lineHeight={1.2} className={'split-text-footer'} />
                </div>
                {/* CTA link */}
                <div className='footer__cta--link links'>
                  <a href={email && email['socialurl']}>
                    Let's talk
                    <BsArrowUpRight /> 
                  </a>
                </div>
            </div>

            {/* Social links */}
            <div className='footer__social'>
                {socialLinks?.filter(item => item.socialname !== "Contact").map((item, index) => (
                    <a key={index} 
                       href={item.fileboolean ? item.fileupload.asset.url : item.socialurl} 
                       target="_blank"
                       className='footer__social--item links'>
                        {item.socialname} <BsArrowUpRight />
                    </a>
                ))}
            </div>
        </section>
    )
}

export default Footer