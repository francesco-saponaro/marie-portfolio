import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

// Router imports
import { NavLink } from 'react-router-dom'

// Components imports
import NavMenu from './NavMenu'

// Utils imports
import { useRemoveScroll } from '../../helpersAndHooks'

// Styles imports
import './Navbar.scss'
import { BsArrowUpRight } from 'react-icons/bs'
import gsap from 'gsap';

// Navbar component
const Nav = ({ scrollPosition, 
               previousScrollRef, 
               altMode, 
               setAltMode, 
               setNavToSectionBoolean, 
               email,
               socialLinks,
               worksSection, 
               credAndFooterContainerSection }) => {

  // Ref to be assigned to nav section
  let navRef = useRef(null);

  // Burger toggle state
  let [burgerToggle, setBurgerToggle] = useState(false)

  // Nav style states
  let [navBackground, setNavBackground] = useState("transparent");
  let [navColor, setNavColor] = useState("#0f141e")
  let [navOpacity, setNavOpacity] = useState("1")
  let [navBackgroundToggleTransition, setNavBackgroundToggleTransition] = useState("")

  // Custom function removing scrolling functionality if burger toggle is open
  useRemoveScroll(burgerToggle)

  // On alt mode change, toggle nav color
  useEffect(() => {
    if(altMode) {
      setNavColor("#e1dfdd")
    } else {
      setNavColor("#0f141e")
    }
  }, [altMode])

  // On burgerToggle state change, change nav styles
  useEffect(() => {
    if(!burgerToggle) {
      setTimeout(() => {
        setNavBackground("transparent");
        setNavOpacity("1")
        setNavBackgroundToggleTransition("transform 0.35s ease-out, background-color ease-out .5s, opacity ease-out .4s");
        if(altMode) {
          setNavColor("#ffffff");
        } else {
          setNavColor("#0f141e");
        }
      }, 250)
    } else {
        if(altMode) {
          setNavBackground("#e1dfdd");
          setNavColor("#0f141e");
        } else {
          setNavBackground("#0f141e");
          setNavColor("#ffffff");
        }
        setNavOpacity("0")
        setNavBackgroundToggleTransition("transform 0.35s ease-out");
    }
  }, [burgerToggle])

  // Gsap page load nav opacity animation
  useLayoutEffect(() => {
    let navOpacity = gsap.fromTo(navRef.current, {
      opacity: 0
    }, {
      opacity: 1, 
      ease: "power2",
      duration: .5,
      delay:.1
    })

    // Clean up
    return () => {
      navOpacity.revert()
    }
  }, [])

  // Gsap opened menu height and menu links translate Y animations 
  let [ heightBoolState, setHeightBoolState ] = useState(false)
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // If burgerToggle state is true, set height to 100vh and when complete transalte Y links to be shown
      if(burgerToggle) {
        setHeightBoolState(true);                               // Set this boolean state to true, as with it, to then  
        gsap.set('.nav__menu--item', {autoAlpha: 0, y: 100});   // close the menu we also check if menu was opened at lease once.
        gsap.to(navRef.current, {                               // Otherwise on page load it will run the next animation since the 
          height:"100vh",                                       // burgerToggle state will be false by default.
          ease: "power1.inOut",
          duration: .4,
          onComplete: () => {
            gsap.to('.nav__menu--item', {
              y: 0,
              autoAlpha:1,
              stagger: 0.04
            })
          } 
        })
      } 
      // If burgerToggle state is false, and setHeightBoolState is false (menu was opened at least once), go from 100vh to original height
      else {
        if(heightBoolState) {
          setHeightBoolState(false)
          gsap.from(navRef.current, {
            height: "100vh",
            ease: "power1.inOut",
            duration: .4,
          })
        }
      }
    }, navRef)

    // Clean up
    return () => {
      ctx.revert()
    } 
  }, [burgerToggle])

  return (
    // If scrolling down the nav will be hidden
    <nav className={`nav ${scrollPosition > previousScrollRef.current & scrollPosition !== 0 && "hide-nav"}`}
         style={{ backgroundColor: navBackground, transition: navBackgroundToggleTransition }}
         ref={navRef}>
      {/* Nav container */}
      <div className='nav__container'>
        {/* Nav title */}
        <NavLink to="/" 
                 className='nav__text nav__title' style={{ color: navColor }}>
          Marie-Eve Carlotti.
        </NavLink>

        {/* Nav cta */}
        <div className='nav__text nav__cta links' 
             style={{ opacity: navOpacity, transition: navBackgroundToggleTransition, visibility: burgerToggle ? "hidden" : "" }}
        >
          <a href={email && email['socialurl']}>Let's talk <BsArrowUpRight /></a>
        </div>

        {/* Nav day/night mode toggler */}
        <div className='nav__mode' 
             style={{ opacity: navOpacity, transition: navBackgroundToggleTransition, visibility: burgerToggle ? "hidden" : "" }}
             onClick={() => setAltMode(prev => !prev)}
        />

        {/* Nav Burger */}
        <button className={`nav__toggle-btn ${burgerToggle && 'open'}`} 
                onClick={() => setBurgerToggle(prev => !prev)}>
          <span style={{ backgroundColor: navColor }} />
          <span style={{ backgroundColor: navColor }} />
          <span style={{ backgroundColor: navColor }} />
        </button>

        {/* Nav Location text */}
        <div className='nav__location'>
          Paris, France
        </div>
      </div>

      {/* Nav menu */}
      {burgerToggle &&
        <NavMenu worksSection={worksSection} 
                 credAndFooterContainerSection={credAndFooterContainerSection} 
                 setBurgerToggle={setBurgerToggle}
                 setNavToSectionBoolean={setNavToSectionBoolean}
                 socialLinks={socialLinks && socialLinks} />
      }
    </nav>
  )
}

export default Nav