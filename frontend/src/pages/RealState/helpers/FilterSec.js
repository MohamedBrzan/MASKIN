import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormSelect from 'react-bootstrap/FormSelect';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader';
import OffcanvasBody from 'react-bootstrap/OffcanvasBody';
import '../RealState.css';
import CloseButton from 'react-bootstrap/CloseButton';
import CountrySelect from './CountrySelect';
import TypeSelect from './TypeSelect';
import { useEffect } from 'react';
import AreaSelect from './AreaSelect';
// import UrgentSelect from './UrgentSelect';

const FilterSec = ({
  isSuccess,
  data,
  features,
  setFeatures,
  bedroom,
  setBedroom,
  bathroom,
  setBathroom,
  kitchen,
  setKitchen,
  balcony,
  setBalcony,
  garage,
  setGarage,
  low,
  high,
  setQuery,
  onChangePrice,
  propertyType,
  setPropertyType,
  urgent,
  setUrgent,
  placement,
  setPlacement,
  show,
  handleClose,
}) => {
  const [countryValue, setCountryValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const [urgentValue, setUrgentValue] = useState('');

  const onSubmitPrice = (e) => {
    e.preventDefault();
    if (low > high) {
      [low, high] = [high, low];
    } else if (low) {
      setQuery(`?price[gte]=${low}&price[lte]=${high}`);
    } else if (high) {
      setQuery(`?price[gte]=${low}&price[lte]=${high}`);
    } else {
      setQuery(`?price[low]=${low}&price[high]=${high}`);
    }
  };

  const onSubmitFeatures = (e) => {
    e.preventDefault();
    if (bedroom) {
      setQuery(`?features[${features}]=${bedroom}`);
    } else if (bathroom) {
      setQuery(`?features[${features}]=${bathroom}`);
    } else if (kitchen) {
      setQuery(`?features[${features}]=${kitchen}`);
    } else if (balcony) {
      setQuery(`?features[${features}]=${balcony}`);
    } else if (garage) {
      setQuery(`?features[${features}]=${garage}`);
    }
  };

  document.querySelector('.offcanvas')?.addEventListener('click', () => {
    document
      .querySelectorAll('.custom-select-options')
      .forEach((selectOption) => {
        selectOption.classList.remove('d-block');
        selectOption.classList.add('d-none');
      });
  });

  return (
    <Offcanvas
      placement='start'
      show={show}
      onHide={handleClose}
      className='bg-light p-1'
    >
      <OffcanvasHeader className='menu-icon mt-3'>
        <CloseButton onClick={handleClose} className='bg-custom'></CloseButton>
        <span>
          <b>???????? ???? ????????</b>
        </span>{' '}
        <span>
          <FontAwesomeIcon
            icon={faRotateRight}
            size='lg'
            className='bg-custom'
          />{' '}
        </span>{' '}
      </OffcanvasHeader>
      <OffcanvasBody>
        {' '}
        <TypeSelect
          setQuery={setQuery}
          typeValue={typeValue}
          setTypeValue={setTypeValue}
        />
        <hr />
        <CountrySelect
          setQuery={setQuery}
          countryValue={countryValue}
          setCountryValue={setCountryValue}
        />
        <hr />
        <AreaSelect
          setQuery={setQuery}
          areaValue={areaValue}
          setAreaValue={setAreaValue}
        />
        <hr />
        {/* <UrgentSelect
          setQuery={setQuery}
          urgentValue={urgentValue}
          setUrgentValue={setUrgentValue}
        /> */}
        <hr />
        <p className='filter-title'>??????????????</p>{' '}
        <Form onSubmit={onSubmitFeatures}>
          <FormSelect
            value={features}
            onChange={(e) => {
              setFeatures(e.target.value);
            }}
          >
            <option value='bedroom'>??????</option>
            <option value='bathroom'>????????</option>
            <option value='kitchen'>????????</option>
            <option value='balcony'>????????</option>
            <option value='garage'>????????</option>
          </FormSelect>
          {features === 'bedroom' ? (
            <Form.Group>
              <Form.Label>???????? ?????? : </Form.Label>
              <FormControl
                className='mb-3'
                type='number'
                placeholder='???????? ??????'
                value={bedroom}
                name='bedroom'
                onChange={(e) => setBedroom(e.target.value)}
              />{' '}
            </Form.Group>
          ) : features === 'bathroom' ? (
            <Form.Group>
              <Form.Label>???????? ???????? : </Form.Label>
              <FormControl
                className='mb-3'
                type='number'
                placeholder='???????? ????????'
                value={bathroom}
                name='bathroom'
                onChange={(e) => setBathroom(e.target.value)}
              />{' '}
            </Form.Group>
          ) : features === 'kitchen' ? (
            <Form.Group>
              <Form.Label>???????? : </Form.Label>
              <FormControl
                className='mb-3'
                type='number'
                placeholder='????????'
                value={kitchen}
                name='kitchen'
                onChange={(e) => setKitchen(e.target.value)}
              />{' '}
            </Form.Group>
          ) : features === 'balcony' ? (
            <Form.Group>
              <Form.Label>???????? : </Form.Label>
              <FormControl
                className='mb-3'
                type='number'
                placeholder='????????'
                value={balcony}
                name='balcony'
                onChange={(e) => setBalcony(e.target.value)}
              />{' '}
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>???????? : </Form.Label>
              <FormControl
                className='mb-3'
                type='number'
                placeholder='????????'
                value={garage}
                name='garage'
                onChange={(e) => setGarage(e.target.value)}
              />
            </Form.Group>
          )}

          <Button variant='primary' type='submit' className='my-3'>
            ????????
          </Button>
        </Form>
        <hr />
        <p className='filter-title'>??????????</p>{' '}
        <Form onSubmit={onSubmitPrice}>
          <FormControl
            className='mb-3'
            type='text'
            placeholder='?????????? ????????????'
            value={low}
            name='low'
            onChange={onChangePrice}
          />
          <FormControl
            className='mb-3'
            type='text'
            placeholder='?????????? ????????????'
            value={high}
            name='high'
            onChange={onChangePrice}
          />
          <Button type='submit' variant='primary' className='mb-3 me-2'>
            ??????
          </Button>
        </Form>
        <hr />
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default FilterSec;
