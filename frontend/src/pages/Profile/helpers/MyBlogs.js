import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { ar } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faEye,
  faHandPointDown,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { formatDistance } from 'date-fns';
import blogImage from '../../../images/unknown.png';
import ProfileOffcanvas from './ProfileOffcanvas';
import { useGetMyBlogsQuery } from '../../../store/apis/User/Blog/MyBlogs';
import { useDeleteBlogMutation } from '../../../store/apis/Blog';
import '../../Blog/Blog.css';
import { useCreateViewMutation } from '../../../store/apis/User/Profile';
import PageTitle from '../../../utils/PageTitle';
import { useSelector } from 'react-redux';
import LoadingPage from '../../../utils/LoadingPage';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import ErrorMessage from '../../../error/ErrorMessage';
import { toast } from 'react-toastify';

const MyBlogs = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState('');
  const [search, setSearch] = useState('');
  const { user } = useSelector((state) => state.auth);

  const [deleteBlog, { isLoading: deleteLoading }] = useDeleteBlogMutation();
  const [createView] = useCreateViewMutation();

  const { data, isLoading, isError, error, isSuccess, refetch } =
    useGetMyBlogsQuery(`${query}`);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('هل انت متأكد من حذف هذا المقال؟');

    if (confirmDelete) {
      await deleteBlog(id);
      refetch();
    }
  };

  useEffect(() => {
    if (sorting) {
      setQuery(`?sorting=${sorting}`);
    }

    if (search && isSuccess && data && data.blogs.length <= 0) {
      toast.error('ما تبحث عنه غير متاح حالياً سيتم تحديث الصفحة الأن');
      return setTimeout(() => window.location.reload(), 5000);
    }
    refetch();
    if (isError) return ServerErrorMessage(error);
  }, [data, error, isError, isSuccess, pages, refetch, search, sorting]);

  return (
    <>
      <PageTitle
        title={`مدوناتى | ${
          user && user.name
            ? user.name
            : user && user.user && user.user.name
            ? user.user.name
            : ''
        } `}
      />

      <ProfileOffcanvas />
      <div className='blog-home-img'></div>
      <section className='blog my-blogs p-3'>
        <div className='top-sec d-flex justify-content-between align-items-center'>
          <Link
            to='/me/blogs/create'
            className='create-btn mb-3'
            title='إنشاء مدونة جديدة'
          >
            <i className='fa-solid fa-plus'></i>
          </Link>
          {isSuccess && data && data.blogs.length > 0 && (
            <form>
              <select
                as='select'
                value={sorting}
                onChange={(e) => setSorting(e.target.value)}
              >
                <option value='new'>الأحدث</option>
                <option value='old'>الأقدم</option>
                <option value='high-rating'>التقييم ( الأعلى )</option>
                <option value='low-rating'>التقييم ( الأقل )</option>
              </select>
            </form>
          )}
        </div>{' '}
        <Row className='align-items-center mb-2'>
          <Col>
            <Form.Group>
              <h4 className='search-title mt-3 text-center'>
                ابحث هنــــا <FontAwesomeIcon icon={faHandPointDown} />
              </h4>
              <FormControl
                name='search'
                type='search'
                placeholder='أكتب كلمة البحث هنا.....'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onBlur={() => setQuery(`?search=${search}`)}
                className='search-input'
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {isLoading || deleteLoading ? (
            <LoadingPage />
          ) : isSuccess && data.blogs.length > 0 ? (
            <>
              {data.blogs.map((blog, index) => (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className='my-3 col-item'
                  key={index}
                >
                  <div className='blog-card'>
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
                    <div className='info-container'>
                      <Link
                        to={`/blog/${blog._id}`}
                        onClick={() => {
                          handleCreateView(blog._id);
                          refetch();
                        }}
                      >
                        <p>التعليقات : {blog.reviews.length}</p>
                        <p> المشاهدات : {blog.views.length}</p>
                        <p>الوقت : منذ {dataFormatter(blog.createdAt)}</p>
                      </Link>
                      <div className='action-btn'>
                        <Link
                          to={`/me/blogs/${blog._id}/update`}
                          className='edit'
                        >
                          <FontAwesomeIcon icon={faEdit} size='3x' />
                        </Link>
                        <Link
                          to='/me/blogs'
                          className='delete'
                          onClick={() => handleDelete(blog._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} size='3x' />
                        </Link>
                      </div>
                    </div>

                    {new Date(blog.createdAt).getMonth() + 1 >
                      new Date().getMonth() && <div className='new'>جديد</div>}

                    <div className='watches'>
                      <FontAwesomeIcon
                        icon={faEye}
                        size='sm'
                        className='me-1'
                      />
                      {blog.views.length}
                    </div>
                  </div>
                </Col>
              ))}
            </>
          ) : (
            <ErrorMessage>
              لا يوجد مدونات{' '}
              <Link to='/me/blogs/create'>إنشاء مدونة جديدة</Link>
            </ErrorMessage>
          )}

          {isSuccess && data.blogs.length > 0 && (
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
          )}
        </Row>
      </section>
    </>
  );
};

export default MyBlogs;
