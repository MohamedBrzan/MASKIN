import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import BlogSlider from '../BlogSlider';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  useCreateBlogReviewMutation,
  useGetBlogByIdQuery,
} from '../../../../store/apis/Blog';
import MySpinner from '../../../../utils/MySpinner';
import unknownImage from '../../../../images/unknown.png';
import RatingStars from '../../../../components/RatingStars';
import PageTitle from '../../../../utils/PageTitle';
import ServerErrorMessage from '../../../../error/ServerErrorMessage';
import './BlogDetails.css';
import { useSelector } from 'react-redux';

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError, error, refetch } = useGetBlogByIdQuery(id);

  const [createBlogReview, { isLoading: loadingCreateReview }] =
    useCreateBlogReviewMutation();

  const [formData, setFormData] = useState({
    comment: '',
    ratingNum: 0,
  });

  const { comment, ratingNum } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handelCreateBlogReview = async (e) => {
    e.preventDefault();
    await createBlogReview({
      id,
      ratingNum,
      comment,
    })
      .then((res) => {
        if (res.data && res.data.message) {
          toast.success(res.data.message);
        }

        refetch();
      })
      .catch((err) => {
        if (err.data.message) {
          toast.error(err.data.message);
        } else {
          toast.error(err);
        }
      });
  };

  useEffect(() => {
    refetch();
    if (isError) return toast.error(ServerErrorMessage(error));
  }, [error, isError, refetch]);

  return (
    <section className='blog-details'>
      {data && data.blog && <PageTitle title={`???????? | ${data.blog.title} `} />}
      {isLoading ? (
        <MySpinner />
      ) : (
        <>
          <BlogSlider images={data.blog.images} />
          <div className='blog-title mt-5'>
            <h3>
              <b>{data.blog.title}</b>
            </h3>
          </div>
          <hr />
          <div className='blog-author-info d-flex'>
            <p className='mx-2'> ???????? ???????????? : </p>{' '}
            {user && data.blog.owner?.name ? (
              <Link to={`/user/${data.blog.owner?._id}`}>
                {' '}
                {data.blog.owner?.name}
              </Link>
            ) : !user && data.blog.owner?.name ? (
              <div>{data.blog.owner?.name}</div>
            ) : (
              <span>?????? ??????????</span>
            )}
          </div>
          <p>
            ?????????????? :
            {new Date(data.blog.createdAt).toLocaleString() ||
              new Date(data.blog.updatedAt).toLocaleDateString()}
          </p>
          <p>?????? ????????????????/?????????????????? : ( {data.blog.views.length} )</p>
          <hr />
          <p> ?????????????? : {<RatingStars rating={data.blog.rating} />}</p>
          <hr />
          <p>{data.blog.content}</p>
          <hr />

          <div className='comments-sec'>
            <h3>?????????????????? ({data.blog.reviews.length}) </h3>
            {user?.user &&
              user?.user.name &&
              user?.user._id !== data.blog.owner._id && (
                <div className='make-comment'>
                  <h3 className='title'>???????? ??????????????</h3>
                  <Form onSubmit={handelCreateBlogReview}>
                    <Form.Group>
                      <Form.Label> ???????????????????? : </Form.Label>
                      <FormControl
                        as={'textarea'}
                        rows='5'
                        type='text'
                        name='comment'
                        value={comment}
                        onChange={handleChange}
                        placeholder='????????????????????'
                        required
                      />
                    </Form.Group>
                    <Col md={2} className='my-3'>
                      <Form.Group>
                        <Form.Label> ?????????????? :</Form.Label>
                        <FormControl
                          type='number'
                          name='ratingNum'
                          value={ratingNum}
                          max='5'
                          onChange={handleChange}
                          placeholder='??????????????'
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Button
                      type='submit'
                      className='submit-btn'
                      disabled={loadingCreateReview}
                    >
                      ?????? ??????????????
                    </Button>
                  </Form>
                </div>
              )}
            <div>
              <hr />
              {data.blog.reviews.length > 0 ? (
                data.blog.reviews.map((review, index) => (
                  <Col xs={12} md={10} className='comment p-2' key={index}>
                    <div className='avatar'>
                      <img
                        src={
                          (review.user.avatar &&
                            review.user.avatar.startsWith('data:image')) ||
                          review.user.avatar.startsWith('https://')
                            ? review.user.avatar
                            : unknownImage
                        }
                        alt='Avatar.'
                      />
                    </div>
                    <p>
                      <span className='text-primary'>??????????</span> :{' '}
                      {review.user.name || '?????? ??????????'}
                    </p>
                    <p>
                      <span className='text-primary'>??????????????</span> :{' '}
                      {review.user.email || '?????? ??????????'}
                    </p>
                    <p>
                      <span className='text-primary'>??????????????</span> :{' '}
                      {review.ratingNum ? (
                        <RatingStars rating={review.ratingNum} />
                      ) : (
                        <RatingStars rating={0} />
                      )}
                    </p>
                    <p>
                      <span className='text-primary'>??????????????</span> :{' '}
                      {review.comment || '?????? ??????????'}
                    </p>
                  </Col>
                ))
              ) : (
                <p className='text-center text-muted fs-1'>
                  ???? ???????? ????????????????????
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default BlogDetails;
