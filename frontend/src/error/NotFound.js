import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='not-found'>
      <div className='not-found-text'>
        <div className='caution'>
          <FontAwesomeIcon icon={faTriangleExclamation} />{' '}
          <span>حدث خطأ ما</span>
        </div>
        <h1>
          {' '}
          <b>هذه الصفحه غير موجوده</b>
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
