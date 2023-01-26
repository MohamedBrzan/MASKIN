import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import General from './helpers/General';
import Features from './helpers/Features';
import Amenities from './helpers/Amenities';
import { useState } from 'react';
import Dimensions from './helpers/Dimensions';
import Location from './helpers/Location';
import { useCreateRealStateMutation } from '../../../store/apis/RealState';
import Coordinates from './helpers/Coordinates';
import PriceAndStatus from './helpers/PriceAndStatus';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetMyRealStatesQuery } from '../../../store/apis/User/MyRealStates';
import PageTitle from '../../../utils/PageTitle';
import MySpinner from '../../../utils/MySpinner';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import './CreateRealStateForm.css';

const CreateRealStateForm = () => {
  const [createRealState, { isLoading, isError, error }] =
    useCreateRealStateMutation();
  const { refetch } = useGetMyRealStatesQuery();

  const navigate = useNavigate();

  const startYear = 1990;
  const endYear = new Date().getFullYear();

  let years = [];

  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }

  const [images, setImages] = useState([]);

  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [propertyPurpose, setPropertyPurpose] = useState('residential');
  const [propertyStatus, setPropertyStatus] = useState('available');
  const [propertyPlacement, setPropertyPlacement] = useState('sale');
  const [propertyType, setPropertyType] = useState('house');
  const [propertyDistrict, setPropertyDistrict] = useState('');
  const [propertyCity, setPropertyCity] = useState('');
  const [propertyArea, setPropertyArea] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [blockNo, setBlockNo] = useState(10);
  const [yearBuilt, setYearBuilt] = useState(startYear);

  const [propertyLength, setPropertyLength] = useState(250);
  const [price, setPrice] = useState(250);
  const [propertyWidth, setPropertyWidth] = useState(250);

  const [bedroom, setBedroom] = useState(10);
  const [bathroom, setBathroom] = useState(10);
  const [kitchen, setKitchen] = useState(10);
  const [balcony, setBalcony] = useState(10);
  const [garage, setGarage] = useState(10);

  const [pool, setPool] = useState(false);
  const [elevator, setElevator] = useState(false);
  const [airConditioning, setAirConditioning] = useState(false);
  const [parking, setParking] = useState(false);
  const [internet, setInternet] = useState(false);
  const [security, setSecurity] = useState(false);
  const [fireplace, setFireplace] = useState(false);
  const [garden, setGarden] = useState(false);
  const [guestWC, setGuestWC] = useState(false);
  const [storeRoom, setStoreRoom] = useState(false);
  const [pets, setPets] = useState(false);
  const [gym, setGym] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [other, setOther] = useState(false);

  const [urgent, setUrgent] = useState(false);

  const [latitude, setLatitude] = useState(250);
  const [longitude, setLongitude] = useState(250);

  if (isLoading) return <MySpinner />;
  if (isError) return toast.error(ServerErrorMessage(error));

  const uploadImages = () => {
    const files = document.getElementById('images').files;

    const readAndPreview = (file) => {
      if (/^image\//.test(file.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          setImages((images) => [...images, reader.result]);
        };
      }
    };

    if (files) {
      Array.prototype.forEach.call(files, readAndPreview);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!propertyCity) {
        return toast.error('من فضلك قم بملىء حقل المدينة');
      } else if (propertyCity.match(/riyadh/gi) && !propertyArea) {
        return toast.error('من فضلك قم بملىء حقل المنطقة التابع لمدينة الرياض');
      } else if (propertyCity.match(/jeddah/gi) && !propertyArea) {
        return toast.error('من فضلك قم بملىء حقل المنطقة التابع لمدينة جدة');
      } else if (propertyCity.match(/riyadh/gi) && propertyDistrict === '') {
        return toast.error('من فضلك قم بملىء حقل الحى التابع لمدينة الرياض');
      } else if (propertyCity.match(/jeddah/gi) && propertyDistrict === '') {
        return toast.error('من فضلك قم بملىء حقل الحى التابع لمدينة جدة');
      } else if (!propertyAddress) {
        return toast.error('من فضلك قم بملىء حقل العنوان');
      } else if (!blockNo) {
        return toast.error('من فضلك قم بملىء حقل رقم المنشأة');
      }

      await createRealState({
        general: {
          title: propertyTitle,
          description: propertyDescription,
          images,
          propertyType,
          propertyPurpose,
          yearBuilt,
        },
        location: {
          city: propertyCity,
          area: propertyArea,
          district: propertyDistrict,
          address: propertyAddress,
          blockNo,
        },
        dimensions: {
          height: propertyLength,
          width: propertyWidth,
        },
        features: {
          bedroom,
          bathroom,
          kitchen,
          balcony,
          garage,
        },
        amenities: {
          pool,
          elevator,
          airConditioner: airConditioning,
          parking,
          internet,
          security,
          fireplace,
          garden,
          guestWC,
          storeRoom,
          pets,
          gym,
          laundry,
        },
        coordinates: {
          latitude,
          longitude,
        },
        propertyStatus,
        placement: propertyPlacement,
        price,
        urgent,
      })
        .then(() => {
          refetch();
          navigate('/me/real-states');
        })
        .catch((data) => toast.error(data));
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <div className='create-real-state'>
      <PageTitle title={`مسكن | إنشاء عقار `} />
      <div className='title'>إنشــــاء عقــــار جــديد</div>

      <Form className='create-real-state-form' onSubmit={handleSubmit}>
        <h3>عــــــــــــــام</h3>
        <General
          propertyTitle={propertyTitle}
          setPropertyTitle={setPropertyTitle}
          propertyDescription={propertyDescription}
          setPropertyDescription={setPropertyDescription}
          propertyPurpose={propertyPurpose}
          setPropertyPurpose={setPropertyPurpose}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          propertyAddress={propertyAddress}
          setPropertyAddress={setPropertyAddress}
          blockNo={blockNo}
          setBlockNo={setBlockNo}
          yearBuilt={yearBuilt}
          setYearBuilt={setYearBuilt}
          propertyLength={propertyLength}
          setPropertyLength={setPropertyLength}
          price={price}
          setPrice={setPrice}
          propertyWidth={propertyWidth}
          setPropertyWidth={setPropertyWidth}
          uploadImages={uploadImages}
          images={images}
          setImages={setImages}
          years={years}
        />
        <hr />
        <h3>الأبعـــــــــــــــــــــاد</h3>
        <Dimensions
          propertyLength={propertyLength}
          setPropertyLength={setPropertyLength}
          propertyWidth={propertyWidth}
          setPropertyWidth={setPropertyWidth}
        />
        <hr />
        <h3>مــــــــــوقع المنــــــشــــأة</h3>
        <Location
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          propertyCity={propertyCity}
          setPropertyCity={setPropertyCity}
          propertyArea={propertyArea}
          setPropertyArea={setPropertyArea}
          propertyDistrict={propertyDistrict}
          setPropertyDistrict={setPropertyDistrict}
          propertyAddress={propertyAddress}
          setPropertyAddress={setPropertyAddress}
          blockNo={blockNo}
          setBlockNo={setBlockNo}
        />
        <hr />

        <h3>خصائص المـنشـــــأة</h3>
        <Features
          bedroom={bedroom}
          setBedroom={setBedroom}
          bathroom={bathroom}
          setBathroom={setBathroom}
          kitchen={kitchen}
          setKitchen={setKitchen}
          balcony={balcony}
          setBalcony={setBalcony}
          garage={garage}
          setGarage={setGarage}
        />
        <hr />
        <h3>وسائــــل الــــراحة</h3>
        <Amenities
          pool={pool}
          setPool={setPool}
          elevator={elevator}
          setElevator={setElevator}
          airConditioning={airConditioning}
          setAirConditioning={setAirConditioning}
          parking={parking}
          setParking={setParking}
          internet={internet}
          setInternet={setInternet}
          security={security}
          setSecurity={setSecurity}
          fireplace={fireplace}
          setFireplace={setFireplace}
          garden={garden}
          setGarden={setGarden}
          guestWC={guestWC}
          setGuestWC={setGuestWC}
          storeRoom={storeRoom}
          setStoreRoom={setStoreRoom}
          pets={pets}
          setPets={setPets}
          gym={gym}
          setGym={setGym}
          laundry={laundry}
          setLaundry={setLaundry}
          other={other}
          setOther={setOther}
        />
        <hr />
        <h3>مــــوقع المنشـــــأة على الخريــــطة</h3>
        <Coordinates
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
        />
        <hr />
        <h3>حالة المنشـــــأة والسعر</h3>
        <PriceAndStatus
          propertyStatus={propertyStatus}
          setPropertyStatus={setPropertyStatus}
          propertyPlacement={propertyPlacement}
          setPropertyPlacement={setPropertyPlacement}
          price={price}
          setPrice={setPrice}
          urgent={urgent}
          setUrgent={setUrgent}
        />
        <hr />
        <Button variant='primary' type='submit' className='submit-btn'>
          إضـــــافــة المنشــــأة
        </Button>
      </Form>
    </div>
  );
};

export default CreateRealStateForm;
