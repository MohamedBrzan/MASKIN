import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import GoogleMaps from '../../pages/RealState/helpers/GoogleMaps';
import { useCreateAdMutation, useGetAllAdsQuery } from '../../store/apis/Ad/Ad';
import PageTitle from '../../utils/PageTitle';
import './AdPromotion.css';

const AdPromotion = () => {
  const { refetch } = useGetAllAdsQuery();
  const btnOne = useRef();
  const btnTwo = useRef();
  const [createAd] = useCreateAdMutation();
  const [propertyType, setPropertyType] = useState('house');
  const [propertyPurpose, setPropertyPurpose] = useState('personal');
  const [space, setSpace] = useState(250);
  const [price, setPrice] = useState(250);
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(250);
  const [longitude, setLongitude] = useState(250);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [adProfileFile, setAdProfileFile] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [adType, setAdType] = useState('offer');
  const [adPurpose, setAdPurpose] = useState('investment');
  const [advertiserType, setAdvertiserType] = useState('private');
  const [advertiserCharacter, setAdvertiserCharacter] = useState('owner');
  const [commercialRegistrationNo, setCommercialRegistrationNo] = useState(0);
  const [advertiserNumber, setAdvertiserNumber] = useState(0);
  const [adFiles, setAdFiles] = useState([]);
  const navigate = useNavigate();

  const uploadFile = () => {
    const mainImageFile = document.querySelector('input[name="mainImage"]')
      .files[0];
    const profileFileData = document.querySelector(
      'input[name="adProfileFile"]'
    ).files[0];

    const checkMainImgExtension = (mainImageFile) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          setMainImage(reader.result);
        },
        false
      );
      reader.readAsDataURL(mainImageFile);
    };

    const checkProfileFileExtension = (profileFileData) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          setAdProfileFile(reader.result);
        },
        false
      );
      reader.readAsDataURL(profileFileData);
    };

    if (mainImageFile) {
      checkMainImgExtension(mainImageFile);
    } else if (profileFileData) {
      checkProfileFileExtension(profileFileData);
    }
  };

  const uploadAdFilesData = () => {
    const files = document.getElementById('images').files;

    const readAndPreview = (file) => {
      if (/^image\//.test(file.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          setAdFiles((images) => [...images, reader.result]);
        };
      }
    };

    if (files) {
      Array.prototype.forEach.call(files, readAndPreview);
    }
  };

  useEffect(() => {
    if (
      propertyType === '' ||
      propertyPurpose === '' ||
      space === '' ||
      price === '' ||
      city === '' ||
      neighborhood === '' ||
      area === '' ||
      address === '' ||
      latitude === '' ||
      longitude === ''
    ) {
      btnOne.current.style.display = 'none';
    } else {
      btnOne.current.style.display = 'block';
    }

    if (
      title === '' ||
      description === '' ||
      adType === '' ||
      adPurpose === '' ||
      adProfileFile === '' ||
      mainImage === '' ||
      adFiles.length <= 0
    ) {
      btnTwo.current.style.display = 'none';
    } else {
      btnTwo.current.style.display = 'block';
    }

    const allLis = document.querySelectorAll('[data-toggle="collapse"]');

    const allForms = document.querySelectorAll('section.ad section');

    allLis.forEach((li) => {
      li.onclick = (e) => {
        allForms.forEach((p) => {
          if (p.getAttribute('id') === li.getAttribute('data-target')) {
            allLis.forEach((l) => {
              l.classList.remove('active');
            });
            e.target.classList.add('active');
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      };
    });

    const nextBtn = document.querySelectorAll('.ad-form  .next-btn');
    const prevBtn = document.querySelectorAll('.ad-form  .prev-btn');

    nextBtn.forEach((btn) => {
      btn.onclick = (e) => {
        const target = e.target.parentElement;

        if (target.classList.contains('active')) {
          allLis.forEach((li) => {
            li.classList.remove('active');
            if (
              target &&
              li.getAttribute('data-target') ===
                target.nextElementSibling.getAttribute('id')
            ) {
              li.classList.add('active');
            }
          });
          target.classList.remove('active');
          target.nextElementSibling.classList.add('active');
        }
      };
    });

    prevBtn.forEach((btn) => {
      btn.onclick = (e) => {
        const target = e.target.parentElement;

        if (target.classList.contains('active')) {
          allLis.forEach((li) => {
            li.classList.remove('active');
            if (
              target &&
              li.getAttribute('data-target') ===
                target.previousElementSibling.getAttribute('id')
            ) {
              li.classList.add('active');
            }
          });
          target.classList.remove('active');
          target.previousElementSibling.classList.add('active');
        }
      };
    });
  }, [
    adFiles.length,
    adProfileFile,
    adPurpose,
    adType,
    address,
    area,
    city,
    description,
    latitude,
    longitude,
    mainImage,
    neighborhood,
    price,
    propertyPurpose,
    propertyType,
    space,
    title,
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      propertyType === '' ||
      propertyPurpose === '' ||
      space === '' ||
      price === '' ||
      city === '' ||
      neighborhood === '' ||
      area === '' ||
      address === '' ||
      latitude === '' ||
      longitude === ''
    ) {
      return toast.error(
        '???? ???????? ???????? ???? ???????? ???? ???????????? ???? ???????? ?????????????? ????????????'
      );
    } else if (
      title === '' ||
      description === '' ||
      adType === '' ||
      adPurpose === '' ||
      adProfileFile === '' ||
      mainImage === '' ||
      adFiles.length <= 0
    ) {
      return toast.error(
        '???? ???????? ???????? ???? ???????? ???? ???????????? ???? ???????? ?????????????? ??????????????'
      );
    } else if (
      advertiserType === '' ||
      advertiserCharacter === '' ||
      commercialRegistrationNo === '' ||
      advertiserNumber === ''
    ) {
      return toast.error(
        '???? ???????? ???????? ???? ???????? ???? ???????????? ???? ????????  ???????????? ???? ???????????? ????????????'
      );
    }

    await createAd({
      realStateInfo: {
        general: {
          propertyType,
          propertyPurpose,
          space,
          price,
        },
        location: {
          city,
          neighborhood,
          area,
          address,
        },

        coordinates: {
          latitude,
          longitude,
        },
      },

      adInfo: {
        title,
        description,
        adType,
        adPurpose,
        adProfileFile,
        mainImage,
        adFiles,
      },

      nationalAccess: {
        advertiserType,
        advertiserCharacter,
        commercialRegistrationNo,
        advertiserNumber,
      },
    }).then(() => {
      toast.success(
        '???? ?????????? ?????????????? ?????????? ?????????? ???????????? ???? ???????????? ???????????? ???? ?????? ???????????? 24 ????????'
      );
      navigate('/me');
      refetch();
    });
  };

  return (
    <section className='ad'>
      <PageTitle title={'???????? | ?????????? ??????????'} />
      <div className='ad-home-img'></div>
      <Container>
        <ul className='list-unstyled'>
          <li data-toggle='collapse' data-target='sec1' className='active'>
            ?????????????? ????????????
          </li>
          <li data-toggle='collapse' data-target='sec2'>
            ?????????????? ??????????????
          </li>
          <li data-toggle='collapse' data-target='sec3'>
            ???????????? ???? ???????????? ????????????
          </li>
        </ul>

        <Form onSubmit={onSubmit} noValidate>
          <section id='sec1' className='ad-form active'>
            <Row>
              <Col xs={12} lg={8}>
                {' '}
                <Col className='mb-3'>
                  <FormGroup>
                    <Form.Label>?????? ?????????????? ???????????? : </Form.Label>
                    <FormControl
                      as={'select'}
                      name='propertyPurpose'
                      value={propertyPurpose}
                      onChange={(e) => setPropertyPurpose(e.target.value)}
                      required
                    >
                      <option value='personal'>????????</option>
                      <option value='residential'>????????</option>
                      <option value='industrial'>??????????</option>
                      <option value='commercial'>??????????</option>
                      <option value='other'>????????</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col className='mb-3'>
                  <FormGroup>
                    <Form.Label>?????? ???????????? : </Form.Label>
                    <FormControl
                      as={'select'}
                      name='propertyType'
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      placeholder='?????? ????????????'
                      required
                    >
                      <option value='house'>????????</option>
                      <option value='apartment'>??????</option>
                      <option value='villa'>????????</option>
                      <option value='farm'>??????????</option>
                      <option value='land'>?????? ??????????</option>
                      <option value='room'>????????</option>
                      <option value='townhouse'>???????? ????????</option>
                      <option value='office'>????????</option>
                      <option value='warehouse'>????????????</option>
                      <option value='other'>????????</option>
                    </FormControl>
                  </FormGroup>
                </Col>{' '}
                <Row>
                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>?????????????? : </Form.Label>
                      <FormControl
                        type='number'
                        name='space'
                        value={space}
                        onChange={(e) => setSpace(e.target.value)}
                        placeholder='??????????????'
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>?????????? : </Form.Label>
                      <FormControl
                        type='number'
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='??????????'
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>?????????????? : </Form.Label>
                      <FormControl
                        type='text'
                        name='area'
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder='??????????????'
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>?????????????? : </Form.Label>
                      <FormControl
                        type='text'
                        name='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='??????????????'
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>???????? : </Form.Label>
                      <FormControl
                        type='text'
                        name='neighborhood'
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder='????????'
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>???????????? : </Form.Label>
                      <FormControl
                        type='text'
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='????????????'
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} lg={4}>
                <Row>
                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>???? ?????????? : </Form.Label>
                      <FormControl
                        type='text'
                        name='latitude'
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder='???? ?????????? '
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>???? ?????????? : </Form.Label>
                      <FormControl
                        type='text'
                        name='longitude'
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder='???? ?????????? '
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <GoogleMaps center={{ lat: latitude, lng: longitude }} />
              </Col>
            </Row>

            <div className='btn-one next-btn' ref={btnOne}>
              ????????????
            </div>
          </section>
          <section id='sec2' className='ad-form'>
            <Row>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label>?????????? ?????????????? : </Form.Label>
                  <FormControl
                    type='text'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='?????????? ?????????????? '
                    required
                  />
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label>?????? ?????????????? : </Form.Label>
                  <FormControl
                    as={'select'}
                    name='adType'
                    value={adType}
                    onChange={(e) => setAdType(e.target.value)}
                    placeholder='?????????? ??????????????'
                    required
                  >
                    <option value='offer'>??????</option>
                    <option value='request'>??????</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label>?????????? ???? ?????????????? : </Form.Label>
                  <FormControl
                    as={'select'}
                    name='adPurpose'
                    value={adPurpose}
                    onChange={(e) => setAdPurpose(e.target.value)}
                    placeholder='?????????? ???? ??????????????'
                    required
                  >
                    <option value='sale'>??????</option>
                    <option value='rent'>??????????</option>
                    <option value='investment'>??????????????</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12}>
                <FormGroup>
                  <Form.Label>?????? ?????????????? : </Form.Label>
                  <FormControl
                    as={'textarea'}
                    rows='5'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='?????? ??????????????'
                    required
                  />
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12}>
                <FormGroup>
                  <Form.Label>
                    ?????????????? ?????????????? :
                    <span className='warning-text'> ( ?????? ?????????? PDF )</span>
                  </Form.Label>
                  <FormControl
                    type='file'
                    onChange={uploadFile}
                    name='adProfileFile'
                    accept='.pdf'
                    required
                  />
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12}>
                <FormGroup>
                  <Form.Label>
                    ???????????? ???????????????? :
                    <span className='warning-text'>( ?????? ???? ???????? ???????? )</span>
                  </Form.Label>
                  <FormControl
                    type='file'
                    onChange={uploadFile}
                    name='mainImage'
                    accept='image/*'
                    required
                  />
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12}>
                <FormGroup>
                  <Form.Label> ???????? ???????? ?????????????? : </Form.Label>
                  <FormControl
                    type='file'
                    onChange={uploadAdFilesData}
                    name='adFiles'
                    id='images'
                    multiple
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <span className='prev-btn'>????????????</span>
            <span className='btn-two next-btn' ref={btnTwo}>
              ????????????
            </span>
          </section>
          <section id='sec3' className='ad-form'>
            <Row>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label> ?????????? : </Form.Label>
                  <FormControl
                    as={'select'}
                    name='advertiserType'
                    value={advertiserType}
                    onChange={(e) => setAdvertiserType(e.target.value)}
                    required
                  >
                    <option value='government'>????????????</option>
                    <option value='private'>????????</option>
                    <option value='citizen'>??????????</option>
                    <option value='resident'>????????</option>
                    <option value='facility'>??????????</option>
                    <option value='company'>????????</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label> ?????? ?????????? ?????????????? : </Form.Label>
                  <FormControl
                    type='number'
                    name='commercialRegistrationNo'
                    value={commercialRegistrationNo}
                    onChange={(e) =>
                      setCommercialRegistrationNo(e.target.value)
                    }
                    placeholder='?????? ?????????? ??????????????'
                    className='text-start'
                    required
                  />
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label> ?????? ???????????? : </Form.Label>
                  <FormControl
                    as={'select'}
                    name='advertiserCharacter'
                    value={advertiserCharacter}
                    onChange={(e) => setAdvertiserCharacter(e.target.value)}
                    required
                  >
                    <option value='owner'>????????????</option>
                    <option value='agent'>????????</option>
                    <option value='broker'>??????????</option>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row className='justify-content-center align-items-center'>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label> ?????? ???????????? : </Form.Label>
                  <FormControl
                    type='number'
                    name='advertiserNumber'
                    value={advertiserNumber}
                    onChange={(e) => setAdvertiserNumber(e.target.value)}
                    placeholder='?????? ????????????'
                    className='text-start'
                    required
                  />
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12} md={6}></Col>
            </Row>
            <Button type='submit'>???????????? ???? ???????????? ????????????</Button>

            <div className='prev-btn'>????????????</div>
          </section>
        </Form>
      </Container>
    </section>
  );
};

export default AdPromotion;
