import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
  faHeart,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

import RealStateSlider from './RealStateSlider';
import { useGetRealStateByIdQuery } from '../../../store/apis/RealState';
import { useParams } from 'react-router';
import MySpinner from '../../../utils/MySpinner';
import ShareIcons from '../../../utils/ShareIcons';
import '../RealStateDetails/RealStateDetails.css';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import { useEffect } from 'react';

const ImagesDisplay = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useGetRealStateByIdQuery(id);

  const handleAddToFavorites = async () => {
    return await axios({
      method: 'POST',
      url: `/api/v1/user/real-states/favorites`,
      data: { id: id },
    })
      .then((res) => toast.success(res.data.message))
      .catch((err) => toast.error(err.response.data.message));
  };

  useEffect(() => {
    if (isError) return toast.error(ServerErrorMessage(error));
  }, [error, isError]);

  return (
    <div className='img-collections position-relative'>
      {isLoading ? (
        <MySpinner />
      ) : (
        <>
          <RealStateSlider images={data.realState.general.images} />

          <ul className='list-unstyled info'>
            {data.realState.propertyStatus === 'available' && (
              <li className='open'>مفتوح</li>
            )}

            {data.realState.propertyStatus === 'available' &&
              new Date(data.realState.createdAt).getMonth() + 1 >
                new Date().getMonth() && <li className='new'>جديد</li>}

            {data.realState.placement === 'sale' &&
              data.realState.propertyStatus === 'available' && (
                <li className='sale'>بيع</li>
              )}
            {data.realState.placement === 'rent' &&
              data.realState.propertyStatus === 'available' && (
                <li className='rent'>إيجار</li>
              )}
            {data.realState.placement === 'rent' &&
              data.realState.propertyStatus === 'rented' && (
                <li className='rented'>تم الإيجار</li>
              )}
            {data.realState.placement === 'sale' &&
              data.realState.propertyStatus === 'sold' && (
                <li className='sold'>تم البيع</li>
              )}

            {data.realState.propertyStatus === 'available' &&
              data.realState.urgent === true && (
                <li className='urgent'>عاجل</li>
              )}
          </ul>
          <ul className='list-unstyled actions'>
            <li
              onClick={() =>
                document.querySelector('.share-icons').classList.toggle('show')
              }
            >
              مشاركة
              <FontAwesomeIcon
                icon={faArrowUpFromBracket}
                className='text-primary px-1'
              />
              <ShareIcons />
            </li>
            <li onClick={handleAddToFavorites}>
              حفظ
              <FontAwesomeIcon
                icon={faHeart}
                className='text-danger px-1'
                onClick={handleAddToFavorites}
              />
            </li>
          </ul>
          <p className='icon'>
            <FontAwesomeIcon icon={faImage} className='text-secondary px-1' />

            {data.realState.general.images.length}
          </p>
        </>
      )}
    </div>
  );
};

export default ImagesDisplay;
