// Scroll to section function
const useScrollTo = (elementRef = null) => {
 // If element is passed scroll to element, otherwise to the top of the page
 window.scrollTo({
    top: elementRef !== null ? elementRef.current.offsetTop : 0,
    behavior: 'smooth'
 });
};

export default useScrollTo