import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import CountrySelect from './CountrySelect';
import TypeSelect from './TypeSelect';
import AreaSelect from './AreaSelect';
import UrgentSelect from './UrgentSelect';
import StateAgeSelect from './StateAgeSelect';
import SpaceSelect from './SpaceSelect';
import RoomSelect from './RoomSelect';
import PriceSelect from './PriceSelect';
import DistrictSelect from './DistrictSelect';
import '../RealState.css';

const StaticFilter = ({ setQuery }) => {
  const [countryValue, setCountryValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [districtValue, setDistrictValue] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const [urgentValue, setUrgentValue] = useState('');
  const [stateAgeValue, setStateAgeValue] = useState('');
  const [minSpaceValue, setMinSpaceValue] = useState('');
  const [maxSpaceValue, setMaxSpaceValue] = useState('');
  const [minPriceValue, setMinPriceValue] = useState('');
  const [maxPriceValue, setMaxPriceValue] = useState('');
  const [roomsValue, setRoomsValue] = useState('');
  return (
    <Row className='align-items-center m-0 p-0'>
      <Col className='mb-3'>
        <TypeSelect
          setQuery={setQuery}
          typeValue={typeValue}
          setTypeValue={setTypeValue}
        />
      </Col>
      <Col className='mb-3'>
        <CountrySelect
          setQuery={setQuery}
          countryValue={countryValue}
          setCountryValue={setCountryValue}
          setAreaValue={setAreaValue}
          setDistrictValue={setDistrictValue}
        />
      </Col>
      {countryValue === 'جدة' && (
        <Col className='mb-3'>
          <AreaSelect
            setQuery={setQuery}
            countryValue={countryValue}
            areaValue={areaValue}
            setAreaValue={setAreaValue}
          />
        </Col>
      )}
      {countryValue === 'الرياض' && (
        <Col className='mb-3'>
          <AreaSelect
            setQuery={setQuery}
            countryValue={countryValue}
            areaValue={areaValue}
            setAreaValue={setAreaValue}
          />
        </Col>
      )}
      {countryValue === 'مكة المكرمة' && (
        <Col className='mb-3'>
          <DistrictSelect
            setQuery={setQuery}
            areaValue={areaValue}
            countryValue={countryValue}
            districtValue={districtValue}
            setDistrictValue={setDistrictValue}
          />
        </Col>
      )}
      {countryValue === 'الرياض' && areaValue !== '' && (
        <Col className='mb-3'>
          <DistrictSelect
            setQuery={setQuery}
            areaValue={areaValue}
            countryValue={countryValue}
            districtValue={districtValue}
            setDistrictValue={setDistrictValue}
          />
        </Col>
      )}
      {countryValue === 'جدة' && areaValue !== '' && (
        <Col className='mb-3'>
          <DistrictSelect
            setQuery={setQuery}
            areaValue={areaValue}
            countryValue={countryValue}
            districtValue={districtValue}
            setDistrictValue={setDistrictValue}
          />
        </Col>
      )}

      <Col className='mb-3'>
        <UrgentSelect
          setQuery={setQuery}
          urgentValue={urgentValue}
          setUrgentValue={setUrgentValue}
        />
      </Col>
      <Col className='mb-3'>
        <StateAgeSelect
          setQuery={setQuery}
          stateAgeValue={stateAgeValue}
          setStateAgeValue={setStateAgeValue}
        />
      </Col>
      <Col className='mb-3'>
        <RoomSelect
          setQuery={setQuery}
          roomsValue={roomsValue}
          setRoomsValue={setRoomsValue}
        />
      </Col>
      <Col className='mb-3' lg={3}>
        <SpaceSelect
          setQuery={setQuery}
          minSpaceValue={minSpaceValue}
          setMinSpaceValue={setMinSpaceValue}
          maxSpaceValue={maxSpaceValue}
          setMaxSpaceValue={setMaxSpaceValue}
        />
      </Col>
      <Col className='mb-3' lg={3}>
        <PriceSelect
          setQuery={setQuery}
          minPriceValue={minPriceValue}
          setMinPriceValue={setMinPriceValue}
          maxPriceValue={maxPriceValue}
          setMaxPriceValue={setMaxPriceValue}
        />
      </Col>
      {/* <Col>
        <p className='filter-title'>الخصائص</p>
        <Form onSubmit={onSubmitFeatures}>
          <FormSelect
            value={features}
            onChange={(e) => {
              setFeatures(e.target.value);
            }}
          >
            <option value='bedroom'>نوم</option>
            <option value='bathroom'>حمام</option>
            <option value='kitchen'>مطبخ</option>
            <option value='balcony'>شرفة</option>
            <option value='garage'>جراج</option>
          </FormSelect>
          {features === 'bedroom' ? (
            <Form.Group>
              <Form.Label>غرفة نوم : </Form.Label>
              <FormControl
                className='mb-3'
                type='number'
                placeholder='غرفة نوم'
                value={bedroom}
                name='bedroom'
                onChange={(e) => setBedroom(e.target.value)}
              />
            </Form.Group>
          ) : features === 'bathroom' ? (
            <Form.Group>
              <Form.Label>دورة مياة : </Form.Label>
              <FormControl
                className='mb-3'
                type='number'
                placeholder='دورة مياة'
                value={bathroom}
                name='bathroom'
                onChange={(e) => setBathroom(e.target.value)}
              />
            </Form.Group>
          ) : features === 'kitchen' ? (
            <Form.Group>
              <Form.Label>مطبخ : </Form.Label>
              <FormControl
                className='mb-3'
                type='number'
                placeholder='مطبخ'
                value={kitchen}
                name='kitchen'
                onChange={(e) => setKitchen(e.target.value)}
              />
            </Form.Group>
          ) : features === 'balcony' ? (
            <Form.Group>
              <Form.Label>شرفة : </Form.Label>
              <FormControl
                className='mb-3'
                type='number'
                placeholder='شرفة'
                value={balcony}
                name='balcony'
                onChange={(e) => setBalcony(e.target.value)}
              />
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>جراج : </Form.Label>
              <FormControl
                className='mb-3'
                type='number'
                placeholder='جراج'
                value={garage}
                name='garage'
                onChange={(e) => setGarage(e.target.value)}
              />
            </Form.Group>
          )}
        </Form>
        <p className='filter-title'>السعر</p>
        <Form onSubmit={onSubmitPrice}>
          <FormControl
            className='mb-3'
            type='text'
            placeholder='السعر الأدنى'
            value={low}
            name='low'
            onChange={onChangePrice}
          />
          <FormControl
            className='mb-3'
            type='text'
            placeholder='السعر الأعلى'
            value={high}
            name='high'
            onChange={onChangePrice}
          />
        </Form>
      </Col> */}
    </Row>
  );
};

export default StaticFilter;
