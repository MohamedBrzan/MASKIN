import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Pagination from 'react-bootstrap/Pagination';
import blogImage from '../../images/img-12.jpg';
import { Link } from 'react-router-dom';
import { useCreateViewMutation } from '../../store/apis/User/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHandPointDown } from '@fortawesome/free-solid-svg-icons';
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useGetAllBlogsQuery } from '../../store/apis/Blog';
import PageTitle from '../../utils/PageTitle';
import LoadingPage from '../../utils/LoadingPage';
import { toast } from 'react-toastify';
import ErrorMessage from '../../error/ErrorMessage';
import ServerErrorMessage from '../../error/ServerErrorMessage';
import './Blog.css';

const Blog = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState('');
  const [search, setSearch] = useState('');

  const [createView] = useCreateViewMutation();

  const { data, isLoading, isError, error, refetch } = useGetAllBlogsQuery(
    `${query}`
  );

  const handleCreateView = async (id) => {
    await createView({ id });
  };

  const dataFormatter = (dateValue) =>
    formatDistance(new Date(dateValue), new Date(Date.now()), { locale: ar });

  let pages = [];

  if (data && data.pageCount) {
    for (let i = 1; i <= data.pageCount; i++) {
      pages.push(i);
    }
  }

  useEffect(() => {
    if (search && !sorting) {
      setQuery(`?search=${search}`);
    } else if (!search && sorting) {
      setQuery(`?sorting=${sorting}`);
    } else if (search && sorting) {
      setQuery(`?search=${search}&sorting=${sorting}`);
    }

    if (isError) return toast.error(ServerErrorMessage(error));
    refetch();
  }, [data, error, isError, pages, refetch, search, sorting]);

  return (
    <section className='blog'>
      <PageTitle title={'مسكن | المدونات'} />
      <Row className='align-items-center mb-2'>
        <Col>
          <Form.Group>
            {/* <h4 className='search-title mt-3 text-center'>
              ابحث هنــــا <FontAwesomeIcon icon={faHandPointDown} />
            </h4> */}
            <FormControl
              name='search'
              type='search'
              placeholder='أكتب كلمة البحث هنا.....'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className='search-input'
            />
          </Form.Group>
        </Col>
        <div className='top-sec d-flex justify-content-end align-items-center'>
          <form>
            <select
              as='select'
              value={sorting}
              onChange={(e) => {
                setSorting(e.target.value);
              }}
            >
              <option value='new'>الأحدث</option>
              <option value='old'>الأقدم</option>
              <option value='high-rating'>التقييم ( الأعلى )</option>
              <option value='low-rating'>التقييم ( الأقل )</option>
            </select>
          </form>
        </div>
      </Row>

      <Row>
        {isLoading ? (
          <LoadingPage />
        ) : data.blogs.length > 0 ? (
          data.blogs.map((blog, index) => (
            <Col
              xs={12}
              md={6}
              lg={4}
              xl={3}
              className='my-3 col-item'
              key={index}
            >
              <div
                className='blog-card'
                onClick={() => {
                  handleCreateView(blog._id);
                  refetch();
                }}
              >
                <Link
                  to={`/blog/${blog._id}`}
                  onClick={() => {
                    handleCreateView(blog._id);
                    refetch();
                  }}
                >
                  <div className='card-img'>
                    <img
                      src={
                        blog.images[0] &&
                        blog.images[0].startsWith('data:image')
                          ? blog.images[0]
                          : !blog.images[0]
                          ? blogImage
                          : blogImage
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
          ))
        ) : (
          <ErrorMessage>لا يوجد مدونات</ErrorMessage>
        )}
      </Row>

      <div className='pagination-container'>
        <Pagination>
          <Pagination.First onClick={() => setQuery(`?page=${+page}`)} />
          <Pagination.Prev
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
                setQuery(`?page=${page - 1}`);
              } else {
                setPage(1);
                setQuery(`?page=${page}`);
              }
            }}
          />
          {pages.map((pageNumber, index) => (
            <Pagination.Item
              key={index}
              active={pageNumber === +data.page}
              onClick={() => setQuery(`?page=${pageNumber}`)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => {
              if (page < data.pageCount) {
                setPage(page + 1);
                setQuery(`?page=${page + 1}`);
              } else {
                setPage(data.pageCount);
                setQuery(`?page=${data.pageCount}`);
              }
            }}
          />
          <Pagination.Last
            onClick={() => setQuery(`?page=${data.pageCount}`)}
          />
        </Pagination>
      </div>
    </section>
  );
};

export default Blog;
