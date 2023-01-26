import { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRectangleAd,
  faSackDollar,
  faSearch,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import image from '../images/img-12.jpg';
import RealStateFeatures from './helpers/RealStateFeatures/RealStateFeatures';
import BlogFeatures from './helpers/BlogFeatures/BlogFeatures';
import { useGetAllBlogsQuery } from '../store/apis/Blog';
import { useGetAllRealStatesQuery } from '../store/apis/RealState';
import { useCreateViewMutation } from '../store/apis/User/Profile';
import LoadingPage from '../utils/LoadingPage';
import ServerErrorMessage from '../error/ServerErrorMessage';
import './Interface.css';
import HomeCarousel from './helpers/HomeCarousel/HomeCarousel';

const Interface = () => {
  const limit = 4;

  const {
    data: blogFeaturesData,
    isLoading: blogFeaturesIsLoading,
    isError: blogFeaturesIsError,
    error: blogFeaturesError,
    refetch: refetchBlogs,
  } = useGetAllBlogsQuery(`?limit_query=${limit}`);

  const {
    data: realStateFeaturesData,
    isLoading: realStateFeaturesIsLoading,
    isError: realStateFeaturesIsError,
    error: realStateFeaturesError,
    refetch: refetchRealStates,
  } = useGetAllRealStatesQuery(`?limit_query=${limit}`);

  const [createView] = useCreateViewMutation();

  const handleCreateView = async (id) => {
    await createView({ id });
  };

  useEffect(() => {
    refetchRealStates();
    refetchBlogs();
    if (blogFeaturesIsError) {
      return toast.error(ServerErrorMessage(blogFeaturesError));
    }
    if (realStateFeaturesIsError) {
      return toast.error(ServerErrorMessage(realStateFeaturesError));
    }
  }, [
    blogFeaturesError,
    blogFeaturesIsError,
    realStateFeaturesError,
    realStateFeaturesIsError,
    refetchBlogs,
    refetchRealStates,
  ]);

  return (
    <>
      <div className='interface'>
        <HomeCarousel />
        {/* <div className='intro-text'>
          <p>من السهل الأن أن تجد منزل أحلامك</p>
          <h1>أفضل طريقة لإيجــاد منــــــزل أحــلامـــك</h1>
        </div> */}
        {/* <div className='bg-modal'></div> */}
      </div>
      {realStateFeaturesIsLoading ? (
        <LoadingPage />
      ) : realStateFeaturesIsError ? (
        <p>{realStateFeaturesError.message}</p>
      ) : (
        <RealStateFeatures
          realStateFeaturesData={realStateFeaturesData}
          handleCreateView={handleCreateView}
        />
      )}
      <div className='features'>
        <Row className='app-features-container'>
          <Col xs={12} lg={6} className='app-features-col'>
            <h1>مهمتنا</h1>
            <p>
              مهمتنا هي تمكين المستهلكين بالمعلومات لاتخاذ قرارات ذكية. هو سوق
              عقاري مخصص لمساعدة أصحاب المنازل ومشتري المنازل والبائعين
              والمستأجرين والوكلاء في العثور على معلومات حول المنازل والعقارات
              وتحسين المنزل ومشاركتها.
            </p>
            <Row>
              <Col xs={12} md={6} className='mb-3'>
                <FontAwesomeIcon
                  icon={faSackDollar}
                  size='3x'
                  className='my-3'
                />
                <br />
                <h3>توفير المال</h3>
                <p>
                  يبدأ بقاعدة بيانات المعيشة الخاصة بنا التي تضم أكثر من 110
                  مليون منزل في الولايات المتحدة - بما في ذلك المنازل المعروضة
                  للبيع والمنازل للإيجار والمنازل غير المعروضة حاليًا في السوق.
                </p>
              </Col>
              <Col xs={12} md={6} className='mb-3'>
                <FontAwesomeIcon
                  icon={faRectangleAd}
                  size='3x'
                  className='my-3'
                />
                <br />
                <h3>مبيعات وتسويق جيدة</h3>
                <p>
                  يبدأ بقاعدة بيانات المعيشة الخاصة بنا التي تضم أكثر من 110
                  مليون منزل في الولايات المتحدة - بما في ذلك المنازل المعروضة
                  للبيع والمنازل للإيجار والمنازل غير المعروضة حاليًا في السوق.
                </p>
              </Col>
              <Col xs={12} md={6} className='mb-3'>
                <FontAwesomeIcon icon={faSun} size='3x' className='my-3' />
                <br />
                <h3>راحة</h3>
                <p>
                  نحن نغير طريقة اتخاذ المستهلكين للقرارات المتعلقة بالمنزل
                  والتواصل مع المهنيين.
                </p>
              </Col>
              <Col xs={12} md={6} className='mb-3'>
                <FontAwesomeIcon icon={faSearch} size='3x' className='my-3' />
                <br />
                <h3>سهل الإيجاد</h3>
                <p>
                  يبدأ بقاعدة بيانات المعيشة الخاصة بنا التي تضم أكثر من 110
                  مليون منزل في الولايات المتحدة - بما في ذلك المنازل المعروضة
                  للبيع والمنازل للإيجار والمنازل غير المعروضة حاليًا في السوق.
                </p>
              </Col>
            </Row>
          </Col>
          <Col xs={12} lg={6} className='app-features-col'>
            <img src={image} alt='' />
          </Col>
        </Row>
      </div>
      {/* {blogFeaturesIsLoading ? (
        <LoadingPage />
      ) : blogFeaturesIsError ? (
        <p>{blogFeaturesError.message}</p>
      ) : (
        <BlogFeatures
          blogFeaturesData={blogFeaturesData}
          handleCreateView={handleCreateView}
        />
      )} */}
    </>
  );
};

export default Interface;
