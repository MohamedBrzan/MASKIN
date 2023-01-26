import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer id='footer'>
      <Row>
        <Col xs={12} md={6} lg={3}>
          <h3> منصة مسكن</h3>
          <div className='text-start'>
            شعارنا هو الرؤية الناجحة لعلمنا أن اختيار الشريك الصحيح في تقديم
            خدمات عقارية احترافية يعد جزءا أساسيا من نجاح رؤيتكم الاستثمارية
          </div>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <h3>روابط سريعة</h3>
          <div className='text-start'>الشروط والأحكام</div>
          <div className='text-start'>سياسة الخصوصية</div>
          <div className='text-start'>سياسة الإسترجاع</div>
          <Link to='/blog'>
            <div className='text-start'>المــدونـة</div>
          </Link>
          <Link to='/contact-us'>
            <div className='text-start'>تواصــل معنا</div>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <h3>تواصل معنا</h3>
          <ul className='list-unstyled text-start'>
            <li>info@maskan.com</li>
            <li>
              المملكة العربية السعودية، الرياض، الربوة، طريق عمر بن عبدالعزيز،
              حي الربوة، الدور الثاني، مكتب رقم 10
            </li>
            <li>الرياض</li>
            <li>+966666666666</li>
          </ul>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <h3>تابعنا على</h3>

          <div className='links'>
            <Link to='/'>
              <i className='fa-brands fa-facebook'></i>
            </Link>
            <Link to='/'>
              <i className='fa-brands fa-twitter'></i>
            </Link>
            <Link to='/'>
              <i className='fa-brands fa-instagram'></i>
            </Link>
            <Link to='/'>
              <i className='fa-brands fa-linkedin'></i>
            </Link>
            <Link to='/'>
              <i className='fa-brands fa-youtube'></i>
            </Link>
            <Link to='/'>
              <i className='fa-brands fa-snapchat'></i>
            </Link>
          </div>
        </Col>
      </Row>
      <div className='footer-down'>
        الرئيسية العروض الطلبات الخدمات الشروط والأحكام اتصل بنا © 2022 مسكن.
      </div>
    </footer>
  );
};

export default Footer;
