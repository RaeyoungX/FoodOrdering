import React, { useEffect, useState } from 'react';
import './HomeScreen.css';

const HomeScreen = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleScroll = () => {
    const secondSectionTop = document.getElementById("second-section").offsetTop;
    const scrollPosition = window.pageYOffset + window.innerHeight;
    // 当用户滚动到第二个section的顶部时，开始动画
    if (scrollPosition >= secondSectionTop) {
      setShowAnimation(true);
    } else {
      setShowAnimation(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-screen">
      <div className="section section-one">
        {/* 第一个section的内容 */}
      </div>
      <div id="second-section" className={`section section-two ${showAnimation ? 'animate' : ''}`}>
        <img src='/secondbg1.png' className="image-up" alt="Image Up"/>
        <img src='/secondbg.png' className="image-down" alt="Image Down"/>
      </div>
       
    </div>
  );
};

export default HomeScreen;


