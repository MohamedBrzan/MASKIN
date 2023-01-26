import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../images/logo.png';
import avatarImage from '../../images/avatar.png';
import { logout, reset } from '../../store/reducers/Authentication/AuthReducer';
import { useGetMyProfileQuery } from '../../store/apis/User/Profile';
import LoadingPage from '../../utils/LoadingPage';
import './Header.css';
import { toast } from 'react-toastify';
import ServerErrorMessage from '../../error/ServerErrorMessage';

const Header = () => {
  const { user, isError, message } = useSelector((state) => state.auth);

  const { isLoading, data } = useGetMyProfileQuery(
    user && user._id ? user._id : ''
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggingOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  if (isError) return toast.error(ServerErrorMessage(message));

  return (
    <header id='header'>
      <Navbar expand='xl'>
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand className='logo'>
              <div>
                {' '}
                <img src={logo} alt='Logo.' /> مسكن
              </div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <div className='main-link'>
                <LinkContainer to='/real-state?sale'>
                  <Nav.Link>للبيع</Nav.Link>
                </LinkContainer>
              </div>
              <div className='main-link'>
                <LinkContainer to='/real-state?rent'>
                  <Nav.Link>للتأجير</Nav.Link>
                </LinkContainer>
              </div>
            </Nav>

            {!user && (
              <Nav>
                <div className='main-link'>
                  <div className='user-home'>
                    <div className='user-container'>
                      <div className='avatar'>
                        <img src={avatarImage} alt='Avatar.' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='main-link login-btn'>
                  <LinkContainer to='/login'>
                    <Nav.Link>تسجيل الدخول / إشترك الأن</Nav.Link>
                  </LinkContainer>
                </div>
              </Nav>
            )}
            {isLoading ? (
              <LoadingPage />
            ) : (
              <>
                {user && (
                  <Nav>
                    <div className='main-link'>
                      <div className='user-home'>
                        <div className='user-container'>
                          <div className='avatar me-3'>
                            <img
                              src={
                                data &&
                                data.user &&
                                data.user.avatar &&
                                data.user.avatar
                              }
                              alt='Avatar.'
                            />
                          </div>
                          <div className='username'>
                            {data &&
                              data.user &&
                              data.user.name &&
                              data.user.name}
                          </div>
                        </div>
                        <ul className='list-unstyled user-dropdown'>
                          <Link to='/me'>
                            <li>الصفحة الشخصية</li>
                          </Link>
                          <Link to='/me/real-states'>
                            <li>منشأتى</li>
                          </Link>
                          <Link to='/me/blogs'>
                            <li>مدوناتى</li>
                          </Link>
                          <Link to='/me/settings'>
                            <li>الإعدادات</li>
                          </Link>
                          <Link to='/' onClick={loggingOut}>
                            <li>تسجيل الخروج</li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </Nav>
                )}
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
