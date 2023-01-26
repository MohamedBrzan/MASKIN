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
        'من فضلك تأكد من ملىء كل الحقول فى خانة معلومات العقار'
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
        'من فضلك تأكد من ملىء كل الحقول فى خانة معلومات الإعلان'
      );
    } else if (
      advertiserType === '' ||
      advertiserCharacter === '' ||
      commercialRegistrationNo === '' ||
      advertiserNumber === ''
    ) {
      return toast.error(
        'من فضلك تأكد من ملىء كل الحقول فى خانة  التحقق من النفاذ الوطنى'
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
        'تم إرسال الإعلان بنجاح وجارى التحقق من النفاذ الوطنى فى مدة أقصاها 24 ساعة'
      );
      navigate('/me');
      refetch();
    });
  };

  return (
    <section className='ad'>
      <PageTitle title={'مسكن | إنشاء إعلان'} />
      <div className='ad-home-img'></div>
      <Container>
        <ul className='list-unstyled'>
          <li data-toggle='collapse' data-target='sec1' className='active'>
            معلومات العقار
          </li>
          <li data-toggle='collapse' data-target='sec2'>
            معلومات الإعلان
          </li>
          <li data-toggle='collapse' data-target='sec3'>
            التحقق من النفاذ الوطنى
          </li>
        </ul>

        <Form onSubmit={onSubmit} noValidate>
          <section id='sec1' className='ad-form active'>
            <Row>
              <Col xs={12} lg={8}>
                {' '}
                <Col className='mb-3'>
                  <FormGroup>
                    <Form.Label>نوع إستخدام العقار : </Form.Label>
                    <FormControl
                      as={'select'}
                      name='propertyPurpose'
                      value={propertyPurpose}
                      onChange={(e) => setPropertyPurpose(e.target.value)}
                      required
                    >
                      <option value='personal'>شخصى</option>
                      <option value='residential'>سكنى</option>
                      <option value='industrial'>صناعى</option>
                      <option value='commercial'>تجاري</option>
                      <option value='other'>أخرى</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col className='mb-3'>
                  <FormGroup>
                    <Form.Label>نوع العقار : </Form.Label>
                    <FormControl
                      as={'select'}
                      name='propertyType'
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      placeholder='نوع العقار'
                      required
                    >
                      <option value='house'>منزل</option>
                      <option value='apartment'>شقة</option>
                      <option value='villa'>فيلا</option>
                      <option value='farm'>مزرعة</option>
                      <option value='land'>أرض خاليه</option>
                      <option value='room'>غرفة</option>
                      <option value='townhouse'>تاون هاوس</option>
                      <option value='office'>مكتب</option>
                      <option value='warehouse'>مستودع</option>
                      <option value='other'>أخرى</option>
                    </FormControl>
                  </FormGroup>
                </Col>{' '}
                <Row>
                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>المساحة : </Form.Label>
                      <FormControl
                        type='number'
                        name='space'
                        value={space}
                        onChange={(e) => setSpace(e.target.value)}
                        placeholder='المساحة'
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>السعر : </Form.Label>
                      <FormControl
                        type='number'
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='السعر'
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>المنطقة : </Form.Label>
                      <FormControl
                        type='text'
                        name='area'
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder='المنطقة'
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>المدينة : </Form.Label>
                      <FormControl
                        type='text'
                        name='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='المدينة'
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>الحي : </Form.Label>
                      <FormControl
                        type='text'
                        name='neighborhood'
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder='الحي'
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>الشارع : </Form.Label>
                      <FormControl
                        type='text'
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='الشارع'
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
                      <Form.Label>خط العرض : </Form.Label>
                      <FormControl
                        type='text'
                        name='latitude'
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder='خط العرض '
                        required
                      />
                    </FormGroup>
                  </Col>

                  <Col className='mb-3'>
                    <FormGroup>
                      <Form.Label>خط الطول : </Form.Label>
                      <FormControl
                        type='text'
                        name='longitude'
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder='خط الطول '
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <GoogleMaps center={{ lat: latitude, lng: longitude }} />
              </Col>
            </Row>

            <div className='btn-one next-btn' ref={btnOne}>
              التالى
            </div>
          </section>
          <section id='sec2' className='ad-form'>
            <Row>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label>عنوان الإعلان : </Form.Label>
                  <FormControl
                    type='text'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='عنوان الإعلان '
                    required
                  />
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label>نوع الإعلان : </Form.Label>
                  <FormControl
                    as={'select'}
                    name='adType'
                    value={adType}
                    onChange={(e) => setAdType(e.target.value)}
                    placeholder='عنوان الإعلان'
                    required
                  >
                    <option value='offer'>عرض</option>
                    <option value='request'>طلب</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label>الغرض من الإعلان : </Form.Label>
                  <FormControl
                    as={'select'}
                    name='adPurpose'
                    value={adPurpose}
                    onChange={(e) => setAdPurpose(e.target.value)}
                    placeholder='الغرض من الإعلان'
                    required
                  >
                    <option value='sale'>بيع</option>
                    <option value='rent'>إيجار</option>
                    <option value='investment'>إستثمار</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12}>
                <FormGroup>
                  <Form.Label>وصف الإعلان : </Form.Label>
                  <FormControl
                    as={'textarea'}
                    rows='5'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='وصف الإعلان'
                    required
                  />
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12}>
                <FormGroup>
                  <Form.Label>
                    بروفايل المشروع :
                    <span className='warning-text'> ( ملف بصيغة PDF )</span>
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
                    الصورة الرئيسية :
                    <span className='warning-text'>( يجب أن تكون صورة )</span>
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
                  <Form.Label> تصفح باقى الملفات : </Form.Label>
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

            <span className='prev-btn'>السابق</span>
            <span className='btn-two next-btn' ref={btnTwo}>
              التالى
            </span>
          </section>
          <section id='sec3' className='ad-form'>
            <Row>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label> الجهة : </Form.Label>
                  <FormControl
                    as={'select'}
                    name='advertiserType'
                    value={advertiserType}
                    onChange={(e) => setAdvertiserType(e.target.value)}
                    required
                  >
                    <option value='government'>حكومية</option>
                    <option value='private'>خاصة</option>
                    <option value='citizen'>مواطن</option>
                    <option value='resident'>مقيم</option>
                    <option value='facility'>منشأة</option>
                    <option value='company'>شركة</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label> رقم السجل التجارى : </Form.Label>
                  <FormControl
                    type='number'
                    name='commercialRegistrationNo'
                    value={commercialRegistrationNo}
                    onChange={(e) =>
                      setCommercialRegistrationNo(e.target.value)
                    }
                    placeholder='رقم السجل التجارى'
                    className='text-start'
                    required
                  />
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label> صفة المعلن : </Form.Label>
                  <FormControl
                    as={'select'}
                    name='advertiserCharacter'
                    value={advertiserCharacter}
                    onChange={(e) => setAdvertiserCharacter(e.target.value)}
                    required
                  >
                    <option value='owner'>المالك</option>
                    <option value='agent'>وكيل</option>
                    <option value='broker'>سمسار</option>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row className='justify-content-center align-items-center'>
              <Col className='mb-3' xs={12} md={6}>
                <FormGroup>
                  <Form.Label> رقم المعلن : </Form.Label>
                  <FormControl
                    type='number'
                    name='advertiserNumber'
                    value={advertiserNumber}
                    onChange={(e) => setAdvertiserNumber(e.target.value)}
                    placeholder='رقم المعلن'
                    className='text-start'
                    required
                  />
                </FormGroup>
              </Col>
              <Col className='mb-3' xs={12} md={6}></Col>
            </Row>
            <Button type='submit'>التحقق من النفاذ الوطنى</Button>

            <div className='prev-btn'>السابق</div>
          </section>
        </Form>
      </Container>
    </section>
  );
};

export default AdPromotion;
