import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

const RatingStars = ({ rating }) => {
  return (
    <span className='rating-stars'>
      {rating < 0.5 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating === 0.5 ? (
        <>
          <FontAwesomeIcon icon={faStarHalfStroke} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating < 1 && rating > 0.5 ? (
        <>
          <FontAwesomeIcon icon={faStarHalfStroke} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating === 1 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating > 1 && rating < 1.5 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStarHalfStroke} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating === 1.5 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStarHalfStroke} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating > 1.5 && rating < 2 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStarHalfStroke} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating === 2 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating === 2.5 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStarHalfStroke} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating > 2.5 && rating < 3 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStarHalfStroke} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating === 3 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating === 3.5 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStarHalfStroke} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating > 3.5 && rating < 4 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStarHalfStroke} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating === 4 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='silver-star' />
        </>
      ) : rating > 4 && rating <= 4.5 ? (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStarHalfStroke} className='gold-star' />
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
          <FontAwesomeIcon icon={faStar} className='gold-star' />
        </>
      )}
    </span>
  );
};

export default RatingStars;
