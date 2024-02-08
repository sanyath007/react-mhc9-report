import React from 'react'
import { Link } from 'react-router-dom'

const SocialIcons = () => {
    return (
        <div className="flex flex-row gap-4 text-2xl">
            <a href="https://www.facebook.com/profile.php?id=100064648815470" target="_blank" rel="noreferrer" className="hover:text-gray-300">
                <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com/fN0pnkdyGrckiLh" target="_blank" rel="noreferrer" className="hover:text-gray-300">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/mentalhealthcenter_9" target="_blank" rel="noreferrer" className="hover:text-gray-300">
                <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@user-vf2ep3tx6h" target="_blank" rel="noreferrer" className="hover:text-gray-300">
                <i className="fab fa-youtube"></i>
            </a>
            <a href="https://line.me/ti/p/@229xqzio" target="_blank" rel="noreferrer" className="hover:text-gray-300">
                <i className="fab fa-line"></i>
            </a>
            <Link to="/contact" className="hover:text-gray-300">
                <i className="fas fa-map-marker-alt"></i>
            </Link>
        </div>
    )
}

export default SocialIcons