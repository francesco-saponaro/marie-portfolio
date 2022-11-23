import React from 'react'

// Styles imports
import './Project.scss'

// Sanity imports
import { urlFor } from '../../client'

// Project page blocks component
const ProjectBlock = ({ projectPageBlocks }) => {
  return (
    <>
    {projectPageBlocks?.map((item, index) => (
      !item.imagesblockboolean ?
      // Project Text and Image block
      <div key={index} className={`${item.imagesleftsideboolean ? "block-right" : "block-left"}`}>
        {/* Info */}
        <div className='info'>
          {item.projectpageblockdescription.map((paragraph, parIndex) => (
            <div key={parIndex} className={`info__${parIndex === 0 ? "title" : "text"}`}>
              <div className='block-header'>
                <div className='animation-container'>
                  {paragraph.descriptionheader}
                </div>
              </div>
              <div className='block-paragraph'>
                <div className='animation-container'>
                  {paragraph.descriptiontext[0].children[0].text}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Image */}
        <div className={`image animation-container ${item.imagesleftsideboolean ? "reveal_fromLeft" : "reveal_fromRight"}`}>
          <img src={urlFor(item.projectpageblockimage.image)} alt={item.projectpageblockimage.alt} />
        </div>
      </div>
      :
      // Project Images only block
      <div key={index} className='block-images'>
        {/* First Image */}
        <div className='image-left'>
          <div className='img animation-container reveal_fromLeft'>
            <img src={urlFor(item.projectpageblockfirstimage.firstimage.image)} 
                 alt={item.projectpageblockfirstimage.firstimage.alt} />
          </div>
          {item.projectpageblockfirstimage.firstimagetext &&
            <div className='block-paragraph'>
              <div className='animation-container'>
                {item.projectpageblockfirstimage.firstimagetext[0].children[0].text}
              </div>
            </div>
          }
        </div>
        {/* Second Image */}
        {item.projectpageblocksecondimage && 
          <div className='image-right'>
            <div className='img animation-container reveal_fromRight'>
              <img src={urlFor(item.projectpageblocksecondimage.secondimage.image)} 
                  alt={item.projectpageblocksecondimage.secondimage.alt} />
            </div>
            {item.projectpageblocksecondimage.secondimagetext &&
              <div className='block-paragraph'>
                <div className='animation-container'>
                  {item.projectpageblocksecondimage.secondimagetext[0].children[0].text}
                </div>
              </div>
            }
          </div>
        }
      </div>
    ))}
    </>
  )
}

export default ProjectBlock