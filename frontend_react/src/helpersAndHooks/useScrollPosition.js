import { useEffect } from 'react';

// Custom hook setting current and previous window vertical offset to state and ref
const useScrollPosition = (setScrollPosition, scrollPosition = 0, previousScrollRef = false) => {

    // Add scroll listener to window object with a function that sets 
    // the window vertical offset to a scrollPosition state
    const setScroll = () => {
        let position = window.pageYOffset;
        setScrollPosition(position);
    }
    
    useEffect(() => {
        window.addEventListener('scroll', setScroll, {passive: true});
       
        // Clean up
        return () => {
            window.removeEventListener('scroll', setScroll)
        }
    }, [])

    // Use ref variable with useEffect to track the previous scrollPosition state value
    // This ref is initially set to Undefined as the useEffect hasnt fired yet, while the 
    // scrollPosition state is set to its initial value.
    // Upon scrolling this useEffect will finally be fired with the intial state value, hence
    // storing its "previous" value.
    useEffect(() => {
        // If ref parameter was given
        if(previousScrollRef) {
            previousScrollRef.current = scrollPosition

            // Clean up
            return () => {
                previousScrollRef.current = 0
            }
        }
    }, [scrollPosition, previousScrollRef])
}

export default useScrollPosition