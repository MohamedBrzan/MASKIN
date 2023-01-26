import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ar } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import unknownImage from '../../../images/unknown.png';
import './BlogFeatures.css';

const BlogFeatures = ({ blogFeaturesData, handleCreateView }) => {
  const dataFormatter = (dateValue) =>
    formatDistance(new Date(dateValue), new Date(Date.now()), { locale: ar });

  return (
    <section className='blog-features'>
      <Container>
        {blogFeaturesData.blogs.length > 0 && (
          <Link to='/blog' className='go-to-blog-page-btn mb-3'>
            <div className='title'>
              <h1> المـــدونــــة</h1>
            </div>
          </Link>
        )}

        <Row>
          {blogFeaturesData.blogs.map((blog, index) => (
            <Col
              xs={12}
              md={6}
              lg={4}
              xl={3}
              className='my-3 col-item'
              key={index}
            >
              <div className='blog-card'>
                <Link
                  to={`/blog/${blog._id}`}
                  onClick={() => handleCreateView(blog._id)}
                >
                  <div className='card-img'>
                    <img
                      src={
                        (blog.images[0] &&
                          blog.images[0].startsWith('data:image')) ||
                        blog.images[0].startsWith('https')
                          ? blog.images[0]
                          : !blog.images[0]
                          ? unknownImage
                          : unknownImage
                      }
                      alt='blog-img'
                    />
                  </div>
                </Link>
                <Link
                  to={`/blog/${blog._id}`}
                  onClick={() => handleCreateView(blog._id)}
                >
                  <div className='info-container'>
                    <p>التعليقات : {blog.reviews.length}</p>
                    <p>الوقت : منذ {dataFormatter(blog.createdAt)}</p>
                  </div>
                  {new Date(blog.createdAt).getMonth() + 1 >
                    new Date().getMonth() && <div className='new'>جديد</div>}
                  <div className='watches'>
                    <FontAwesomeIcon icon={faEye} size='sm' className='me-1' />
                    {blog.views.length}
                  </div>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BlogFeatures;
