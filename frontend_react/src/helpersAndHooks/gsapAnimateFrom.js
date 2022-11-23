import gsap from 'gsap';

// Text translate and opacity animations, scroll direction dependent
const gsapAnimateFrom = (elem, direction, dur) => {
    dur = dur || 1.25;
    direction = direction || 1;
    let y = direction * 100;
    let x = 0;

    if(elem.classList.contains("reveal_fromLeft")) {
        x = -100;
        y = 0;
    } else if (elem.classList.contains("reveal_fromRight")) {
        x = 100;
        y = 0;
    }

    gsap.fromTo(elem, {
      y: y, 
      x: x,
      autoAlpha: 0
    }, {
      duration: dur, 
      y: 0, 
      x: 0,
      autoAlpha: 1, 
      ease: "expo", 
      overwrite: "auto"
    });
}

export default gsapAnimateFrom