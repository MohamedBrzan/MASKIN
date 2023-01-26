import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useCreateBlogMutation } from '../../../store/apis/Blog';
import MySpinner from '../../../utils/MySpinner';
import PageTitle from '../../../utils/PageTitle';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import './CreateBlogForm.css';

const CreateBlogForm = () => {
  const [createBlog, { isLoading, isError, error }] = useCreateBlogMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

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
    e.preventDefault();

    if (title && content && images) {
      await createBlog({
        title: title,
        content: content,
        images: images,
      })
        .unwrap()
        .then(() => navigate('/me/blogs'))
        .catch((err) => toast.error(ServerErrorMessage(err)));
    } else {
      return toast.error('من فضللك تأكد من ملىء جميع الحقول');
    }
  };

  if (isLoading) return <MySpinner />;

  if (isError) return toast.error(ServerErrorMessage(error));

  return (
    <div className='create-blog'>
      <PageTitle title={'مسكن | إنشاء مدونة'} />
      <Form className='create-blog-form' onSubmit={handleSubmit}>
        <h3 className='title'>إنشــــاء مقــــال</h3>
        <Row>
          <Form.Group className='mb-3'>
            <Form.Label>عنــوان المـقـــال :</Form.Label>
            <FormControl
              type='text'
              name='title'
              maxLength='100'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='عنوان المـقال'
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label> محتوى المـقـــال : </Form.Label>
            <FormControl
              as={'textarea'}
              rows='10'
              name='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='محتوى المـقـــال'
              required
            />
          </Form.Group>
        </Row>
        <hr />
        <Form.Group className='mb-3'>
          <Form.Label> إضافة صور المقــــــــال : </Form.Label>
          <FormControl
            type='file'
            multiple
            required
            id='images'
            onChange={uploadImages}
          />
        </Form.Group>{' '}
        <Button type='submit' className='submit-btn'>
          إضافة المقال
        </Button>
        <hr />
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
                onClick={() =>
                  setImages(images.filter((img, i) => i !== index))
                }
              />
              <img src={image} alt='R.S.Img' className='w-100' />
            </Col>
          ))}
        </Row>
      </Form>
    </div>
  );
};

export default CreateBlogForm;
