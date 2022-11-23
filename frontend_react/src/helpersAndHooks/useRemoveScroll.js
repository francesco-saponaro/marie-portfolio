// Function removing scrolling functionality on a specified condition
const useRemoveScroll = (condition) => {
    if(condition) {
        document.body.classList.add('no-scroll')
    } else {
        document.body.classList.remove('no-scroll')
    }
}

export default useRemoveScroll