import { useEffect, useState } from 'react';
import Header from './constants/Header/Header';
import Footer from './constants/Footer/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Ads from './ads/Ads';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router';
import UpBtn from './utils/UpBtn';
import AppRoutes from './routes/AppRoutes';
import PageTitle from './utils/PageTitle';
import LoadingPage from './utils/LoadingPage';
import { gapi } from 'gapi-script';
import { useGetExpiresTimesQuery } from './store/apis/Ad/AdExpire';
import MySpinner from './utils/MySpinner';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const url = location.pathname;
  const { isLoading, data, isSuccess, isError, error, isFetching } =
    useGetExpiresTimesQuery();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    document
      .querySelectorAll('a')
      .forEach((aLink) => (aLink.onclick = () => window.scrollTo(0, 0)));

    function start() {
      gapi.client.init({
        clientId:
          '314628851838-6m5435b9iqmgaka795m6tilroc84q9l9.apps.googleusercontent.com',
        scope: '',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className='App'>
      {loading && <LoadingPage />}

      {url !== '/login' &&
        url !== '/register' &&
        url !== '/forgot-password' &&
        !url.startsWith('/reset-password') && <Header />}

      <main>
        <div id='signDiv'></div>
        <Row className='m-0'>
          <PageTitle title={`مسكن`} />
          <Col xs={12} md={8} lg={10} className='position-relative'>
            <Container fluid={'x-large'}>
              <Col>
                <AppRoutes />
              </Col>
            </Container>
          </Col>
          <Col xs={12} md={4} lg={2} className='position-relative basic-ad'>
            {isLoading && <MySpinner />}
            {isFetching && <MySpinner />}

            {url !== '/login' &&
              url !== '/register' &&
              url !== '/forgot-password' &&
              !url.startsWith('/reset-password') && <Ads />}
          </Col>
        </Row>
      </main>
      <ToastContainer />

      {url !== '/login' &&
        url !== '/register' &&
        url !== '/forgot-password' &&
        !url.startsWith('/reset-password') && <Footer />}

      <UpBtn />
    </div>
  );
}

export default App;
