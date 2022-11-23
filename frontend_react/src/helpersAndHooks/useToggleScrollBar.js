import { useEffect } from "react";

// Custom hook toggling scrollbar display (color) on scroll
const useToggleScrollBar = () => {

  // Timer variable to be assigned to setTimeout function
  let timer = null;

  // Function toggling the show-scrollbar class to pass to the scroll window listener.
  const toggleScrollBar = () => {
    // On each scroll it first clears the timeout, so that it will always be 2 seconds 
    // from last scroll rather than the first.
    if(timer !== null) {
      clearTimeout(timer);        
    }

    // Then checks if the scrollbar is hidden and if so it shows it
    if (!document.body.classList.contains("show-scrollbar")) {
      document.body.classList.add("show-scrollbar");
    } else {
        // Otherwise if its already showing, it sets a timeout to hide it in 2 seconds
        timer = setTimeout(() => {
                  document.body.classList.remove("show-scrollbar");
                },2000)
    }
  } 

  // Assign above function to window scroll listener
  useEffect(() => {
    window.addEventListener('scroll', toggleScrollBar, {passive:true})

    // Clean up
    return () => {
      window.removeEventListener('scroll', toggleScrollBar)
    }
  }, [])
}

export default useToggleScrollBar
