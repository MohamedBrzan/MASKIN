import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import CloseButton from 'react-bootstrap/CloseButton';

const General = ({
  propertyTitle,
  setPropertyTitle,
  propertyDescription,
  setPropertyDescription,
  propertyPurpose,
  setPropertyPurpose,
  propertyType,
  setPropertyType,
  propertyAddress,
  setPropertyAddress,
  blockNo,
  setBlockNo,
  yearBuilt,
  setYearBuilt,
  propertyLength,
  setPropertyLength,
  price,
  setPrice,
  propertyWidth,
  setPropertyWidth,
  uploadImages,
  images,
  setImages,
  years,
}) => {
  return (
    <Row>
      <Col xs={12} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>عنوان المنشأة :</Form.Label>
          <FormControl
            as={'textarea'}
            rows='3'
            maxLength={'300'}
            required
            value={propertyTitle}
            onChange={(e) => setPropertyTitle(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={4} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>الغـــرض :</Form.Label>
          <FormControl
            as={'select'}
            required
            value={propertyPurpose}
            onChange={(e) => setPropertyPurpose(e.target.value)}
          >
            <option value='personal'>شخصى</option>
            <option value='residential'>سكنى</option>
            <option value='industrial'>صناعى</option>
            <option value='commercial'>تجاري</option>
            <option value='other'>أخرى</option>
          </FormControl>
        </Form.Group>
      </Col>
      <Col xs={12} md={4} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>نــوع المنشأة :</Form.Label>
          <FormControl
            as={'select'}
            required
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
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
        </Form.Group>
      </Col>
      {propertyType !== 'farm' && propertyType !== 'land' && (
        <Col xs={12} md={4} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>سنة بناء المنشأة :</Form.Label>
            <FormControl
              as={'select'}
              required
              value={yearBuilt}
              onChange={(e) => setYearBuilt(e.target.value)}
            >
              {years.map((year, i) => (
                <option key={i} value={year}>
                  {year}
                </option>
              ))}
            </FormControl>
          </Form.Group>
        </Col>
      )}
      <Form.Group className='mb-3'>
        <Form.Label> إضافة صور المنشــــأة : </Form.Label>
        <FormControl type='file' multiple id='images' onChange={uploadImages} />
      </Form.Group>{' '}
      <Row className='overflow-hidden m-0 preview'>
        {images.map((image, index) => (
          <Col
            xs={12}
            md={4}
            lg={3}
            key={index}
            className='mb-3 position-relative'
          >
            <CloseButton
              className='close-btn'
              onClick={() => setImages(images.filter((img, i) => i !== index))}
            />
            <img src={image} alt='R.S.Img' className='w-100' />
          </Col>
        ))}
      </Row>
      <hr />
      <Form.Group className='mb-3'>
        <Form.Label> تفـاصيــل أكثر عن المنشــــأة : </Form.Label>
        <FormControl
          as={'textarea'}
          rows='10'
          type='text'
          value={propertyDescription}
          onChange={(e) => setPropertyDescription(e.target.value)}
          placeholder='تفـاصيــل المنشــــأة'
          required
        />
      </Form.Group>
    </Row>
  );
};

export default General;
