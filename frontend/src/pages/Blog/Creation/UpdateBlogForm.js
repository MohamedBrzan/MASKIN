import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useGetMyBlogsQuery } from '../../../store/apis/User/Blog/MyBlogs';
import axios from 'axios';
import MySpinner from '../../../utils/MySpinner';
import PageTitle from '../../../utils/PageTitle';
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from '../../../store/apis/Blog';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import './CreateBlogForm.css';

const UpdateBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetBlogByIdQuery(id);
  const { refetch } = useGetMyBlogsQuery();
  const [updateBlog, { isLoading: updatingLoading }] = useUpdateBlogMutation();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: data?.blog?.title || '',
    content: data?.blog?.content || '',
  });
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { title, content } = formData;

  useEffect(() => {
    const getBlogData = async () => {
      try {
        await axios({
          method: 'GET',
          url: '/api/v1/blog/' + id,
        }).then((res) => {
          setFormData({
            title: res.data.blog.title,
            content: res.data.blog.content,
          });
          setImages(res.data.blog.images);
        });
      } catch (error) {
        return toast.error(ServerErrorMessage(error));
      }
    };
    getBlogData();
  }, [id]);

  if (isLoading || updatingLoading) return <MySpinner />;

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
    e.preventDefault();

    if (title && content && images) {
      await updateBlog({ id, title, content, images }).then(() => {
        refetch();
        navigate('/me/blogs');
      });
    } else {
      return toast.error('من فضللك تأكد من ملىء جميع الحقول');
    }
  };

  return (
    <div className='create-blog'>
      <PageTitle title={'مسكن | تعديل مدونة'} />
      <Form className='create-blog-form' onSubmit={handleSubmit}>
        <h3 className='title'>تعديل مقــــال</h3>
        <Row>
          <Form.Group className='mb-3'>
            <Form.Label>عنــوان المـقـــال :</Form.Label>
            <FormControl
              type='text'
              name='title'
              maxLength='100'
              value={title}
              onChange={handleChange}
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
              onChange={handleChange}
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
            id='images'
            onChange={uploadImages}
          />
        </Form.Group>{' '}
        <Button type='submit' className='submit-btn'>
          تأكيد التعديل
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

export default UpdateBlogForm;
