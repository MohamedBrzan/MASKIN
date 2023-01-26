import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import General from './helpers/General';
import Features from './helpers/Features';
import Amenities from './helpers/Amenities';
import Dimensions from './helpers/Dimensions';
import Location from './helpers/Location';
import {
  useGetRealStateByIdQuery,
  useUpdateRealStateMutation,
} from '../../../store/apis/RealState';
import Coordinates from './helpers/Coordinates';
import PriceAndStatus from './helpers/PriceAndStatus';
import MySpinner from '../../../utils/MySpinner';
import { useGetMyRealStatesQuery } from '../../../store/apis/User/MyRealStates';
import PageTitle from '../../../utils/PageTitle';
import './CreateRealStateForm.css';

const UpdateRealStateForm = () => {
  const { isLoading } = useGetRealStateByIdQuery();
  const [updateRealState, { isLoading: updatingLoading }] =
    useUpdateRealStateMutation();
  const { id } = useParams();
  const { refetch } = useGetMyRealStatesQuery();

  const navigate = useNavigate();

  const startYear = 1990;
  const endYear = new Date().getFullYear();

  let years = [];

  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }

  /************* General *************** */
  const [images, setImages] = useState([]);
  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [propertyPurpose, setPropertyPurpose] = useState('residential');
  const [propertyType, setPropertyType] = useState('house');
  const [yearBuilt, setYearBuilt] = useState(startYear);

  /************* Location *************** */

  const [propertyCity, setPropertyCity] = useState('');
  const [propertyArea, setPropertyArea] = useState('');
  const [propertyDistrict, setPropertyDistrict] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [blockNo, setBlockNo] = useState(1);

  /************* Dimensions *************** */
  const [propertyLength, setPropertyLength] = useState(1);
  const [propertyWidth, setPropertyWidth] = useState(1);

  /************* Features *************** */

  const [bedroom, setBedroom] = useState(1);
  const [bathroom, setBathroom] = useState(1);
  const [kitchen, setKitchen] = useState(1);
  const [balcony, setBalcony] = useState(1);
  const [garage, setGarage] = useState(1);

  /************* Amenities *************** */

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

  /************* Coordinates *************** */
  const [latitude, setLatitude] = useState(1);
  const [longitude, setLongitude] = useState(1);
  /********************************************************* */
  const [urgent, setUrgent] = useState(false);
  const [propertyStatus, setPropertyStatus] = useState('sold');
  const [price, setPrice] = useState(1);
  const [propertyPlacement, setPropertyPlacement] = useState('sale');
  /********************************************************* */

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
      
      await updateRealState({
        id: id,
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

  useEffect(() => {
    const getRealStateById = async () => {
      return await axios({
        method: 'GET',
        url: `/api/v1/real-state/${id}`,
      }).then((response) => {
        /*********** General ********** */
        setImages(response.data.realState.general.images);
        setPropertyTitle(response.data.realState.general.title);
        setPropertyDescription(response.data.realState.general.description);
        setPropertyPurpose(response.data.realState.general.propertyPurpose);
        setPropertyType(response.data.realState.general.propertyType);
        setYearBuilt(response.data.realState.general.yearBuilt);

        /*********** Location ********** */
        setPropertyCity(response.data.realState.location.city);
        setPropertyArea(response.data.realState.location.area);
        setPropertyDistrict(response.data.realState.location.district);
        setPropertyAddress(response.data.realState.location.address);
        setBlockNo(response.data.realState.location.blockNo);

        /*********** Dimensions ********** */
        setPropertyLength(response.data.realState.dimensions.height);
        setPropertyWidth(response.data.realState.dimensions.width);

        /*********** Features ********** */
        setBedroom(response.data.realState.features.bedroom);
        setBathroom(response.data.realState.features.bathroom);
        setKitchen(response.data.realState.features.kitchen);
        setBalcony(response.data.realState.features.balcony);
        setGarage(response.data.realState.features.garage);

        /*********** Amenities ********** */

        setPool(response.data.realState.amenities.pool);
        setElevator(response.data.realState.amenities.elevator);
        setAirConditioning(response.data.realState.amenities.airConditioner);
        setParking(response.data.realState.amenities.parking);
        setInternet(response.data.realState.amenities.internet);
        setSecurity(response.data.realState.amenities.security);
        setFireplace(response.data.realState.amenities.fireplace);
        setGarden(response.data.realState.amenities.garden);
        setGuestWC(response.data.realState.amenities.guestWC);
        setStoreRoom(response.data.realState.amenities.storeRoom);
        setPets(response.data.realState.amenities.pets);
        setGym(response.data.realState.amenities.gym);
        setLaundry(response.data.realState.amenities.laundry);

        /*********** Coordinates ********** */
        setLatitude(response.data.realState.coordinates.latitude);
        setLongitude(response.data.realState.coordinates.longitude);
        /**************************************************************** */
        setPropertyStatus(response.data.realState.propertyStatus);
        setPrice(response.data.realState.price);
        setPropertyPlacement(response.data.realState.placement);
        setUrgent(response.data.realState.urgent);
      });
    };
    getRealStateById();
  }, [id]);

  if (isLoading || updatingLoading) return <MySpinner />;

  return (
    <div className='create-real-state'>
      <PageTitle title={`مسكن | تعديل عقار `} />
      <div className='title'>تعديل المنشأة </div>

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
          تأكيد التعديلات
        </Button>
      </Form>
    </div>
  );
};

export default UpdateRealStateForm;
