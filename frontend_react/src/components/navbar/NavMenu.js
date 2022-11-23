import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

// utils imports
import { scrollTo } from '../../helpersAndHooks'

// Styles imports
import './Navbar.scss'
import { BsArrowUpRight, BsArrowRight } from 'react-icons/bs'

// Nav Menu
const NavMenu = ({ worksSection, credAndFooterContainerSection, setBurgerToggle, setNavToSectionBoolean, socialLinks }) => {
    const sectionLinks = ['Work', 'About me'];

    // Location and navigate hooks needed for promise below
    const location = useLocation();
    const navigate = useNavigate();

    // Promise function setting boolean to true and function closing the menu and navigating to main page 
    // Then scrolling to selected section and setting boolean to false again
    const closeMenuAndNavigate = (section) => {
        // "Producing Code" (May take some time)
        let myPromise = new Promise(function(resolve, reject) {
            setNavToSectionBoolean(true);
            setBurgerToggle(prev => !prev);

            if(location.pathname !== "/") {
                navigate("/");
            }

            resolve("Successful"); // when successful
            reject("Error");  // when error
        });
        
        // "Consuming Code" (Must wait for a fulfilled Promise)
        myPromise.then(() => {
            setTimeout(() => {
                scrollTo(section)
            }, 500)

            setNavToSectionBoolean(false)
        }).catch((message) => {
            console.log(message)
        });
    }

    return (
        <ul className='nav__menu'>
            {/* Section navigation links */}
            {sectionLinks.map((item, index) => (
                <li className="links" 
                    key={index} 
                    onClick={item === 'Work' ? 
                                () => closeMenuAndNavigate(worksSection) : 
                             item === 'About me' ? 
                                () => closeMenuAndNavigate(credAndFooterContainerSection) :
                             null}>
                                <a className='nav__menu--item'>{item} <BsArrowRight /></a>
                </li>
            ))}
            {/* Social links */}
            {socialLinks?.map((item, index) => (
                <li className="links" key={index}>
                    <a className='nav__menu--item' 
                       href={item.fileboolean ? item.fileupload.asset.url : item.socialurl} 
                       target={item.socialname !== "Contact" ? "_blank" : "_self"}>
                        {item.socialname} <BsArrowUpRight />
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default NavMenu