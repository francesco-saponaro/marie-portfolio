import React from 'react'

// Splitting text component - for translateY text single letter animations
const TextToSplit = ({target, className, lineHeight=1}) => {
  return (
    <>
    {/* Separate words by splitting text at space */}
    {target.split(" ").map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} style={{ display: "inline-block", overflow: "hidden", lineHeight: lineHeight }}>
            {/* Then split words by each letter */}
            {word.split("").map((letter, letterIndex) => (
                <span key={`${letter}-${letterIndex}`} className={className} style={{ display: "inline-block" }}>{letter}</span>
            ))}{wordIndex !== target.split(" ").length - 1 && '\u00A0'} {/* Add a white space if its not the last word */}
        </span>
    ))}
    </>
  )
}

export default TextToSplit