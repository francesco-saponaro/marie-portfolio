import React, { useEffect, useLayoutEffect, useRef } from 'react'

// Style imports
import gsap from 'gsap';

// Loader component
const Loader = ({ setLoader, altMode }) => {
 
  // Loader section ref
  const loaderRef = useRef();

  // Change body bg color on altMode since when switching from loader to app itll show body in between animation
  useEffect(() => {
    if(altMode) {
      document.body.style.backgroundColor = '#0f141e';
    } else {
      document.body.style.backgroundColor = '#e1dfdd';
    }
  }, [altMode])

  // Gsap loader animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const preLoadTl = gsap.timeline({ onComplete: () => setLoader(false)})
      preLoadTl.fromTo(loaderRef.current, { opacity: 0 }, { opacity: 1, ease: "power2.out" });
      preLoadTl.fromTo('.loader__content--text', { y: 100,}, { y: 0, stagger: 0.075, ease: "power2.out" });
      preLoadTl.to('.loader__content--text', { y: -100, stagger: -0.075, ease: "power2.in" }, "+=50%");
      preLoadTl.to(loaderRef.current, { duration: .6, height: "0%", ease:"power2.inOut" }, "-=15%");
    }, loaderRef)

    // Clean up
    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div className={`loader ${altMode ? "alt-mode" : ""}`} ref={loaderRef}>
        <div className='loader__content'>
          {['Marie-eve', 'Carlotti'].map((name, index) => (
            <span key={index} className='loader__content--text'>
              {name}
            </span>
          ))}
        </div>
    </div>
  )
}

export default Loader