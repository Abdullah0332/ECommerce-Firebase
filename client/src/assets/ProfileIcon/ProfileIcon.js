import React from 'react'
import Lottie from 'react-lottie'
import * as profileIcon from './profileIcon.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: profileIcon.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
const ProfileIcon = () => {
    return (
        <div>
            <Lottie options={defaultOptions} height={120} width={120} />
        </div>
    )
}

export default ProfileIcon