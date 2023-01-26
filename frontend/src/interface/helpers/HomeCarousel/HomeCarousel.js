import homeImage1 from '../../../images/home_carousel_1.jpg';
import homeImage2 from '../../../images/home_carousel_2.jpg';
// import './HomeCarousel.css';

// export default function HomeCarousel() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     vertical: true,
//     verticalSwiping: true,
//     autoplay: true,
//     speed: 2000,
//     autoplaySpeed: 2000,
//     beforeChange: function (currentSlide, nextSlide) {
//       console.log('before change', currentSlide, nextSlide);
//     },
//     afterChange: function (currentSlide) {
//       console.log('after change', currentSlide);
//     },
//   };

//   const carousel = [
//     {
//       image: homeImage1,
//       text: 'any text',
//     },
//     {
//       image: homeImage2,
//       text: 'any text two',
//     },
//   ];

//   const renderCarousel = () => (
//     <div className='home-carousel'>
//       {carousel.map(({ image, text }, index) => (
//         <div className='track' key={index}>
//           <img src={image} alt={text} />
//           <div className='text'>
//             <h1>{text}</h1>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
//   return <div>{renderCarousel()}</div>;
// }

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import './HomeCarousel.css';
import { useEffect } from 'react';

export default function ReactSlickDemo() {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  };

  useEffect(() => {}, []);

  return (
    <Slider
      {...settings}
      afterChange={(e) => {
        document.querySelectorAll('.image-container .text').forEach((text) => {
          // text.style.animation = 'infiniteAnime 1s alternate-reverse ease-in-out';
          // setTimeout(() => (text.style.animation = ''), 2000);
          text.classList.add('active');
          setTimeout(() => text.classList.remove('active'), 3500);
        });
      }}
      className='w-100'
    >
      <div className='image-container'>
        <img src={homeImage1} className='w-100' alt='' />
        <div className='text'>
          <div className='word'>
            <b>كـــــنــــا</b>
          </div>
        </div>
        <div className='home_slick_modal'></div>
      </div>
      <div className='image-container'>
        <img src={homeImage2} className='w-100' alt='' />
        <div className='text'>
          <div className='word'>
            <b>صــــــرنـــــــا</b>
          </div>
        </div>
        <div className='home_slick_modal'></div>
      </div>
      <div className='image-container'>
        <img src={homeImage2} className='w-100' alt='' />
        <div className='text'>
          <div className='word'>
            <b>بفضل الله ثم ....... قيــــــــادتـــــــــــنا </b>
          </div>
        </div>
        <div className='home_slick_modal'></div>
      </div>
    </Slider>
  );
}
