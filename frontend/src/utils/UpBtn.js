import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const UpBtn = () => {
  const handleAction = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY >= 700) {
        document.querySelector('.up-btn').style.right = 20 + 'px  ';
      } else {
        document.querySelector('.up-btn').style.right = -100 + 'px  ';
      }
    };
  }, []);

  return (
    <div className='up-btn' onClick={handleAction}>
      <FontAwesomeIcon icon={faArrowUp} size='2x' />
    </div>
  );
};

export default UpBtn;
