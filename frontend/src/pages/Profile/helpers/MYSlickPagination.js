import React, { Component } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

export default class MyPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }
  render() {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 2,
    }).format;

    const dataFormatter = (dateValue) =>
      formatDistance(
        new Date(dateValue),
        new Date(Date.now()),
        { locale: ar } // Pass the locale as an option
      );

    return (
      <Col xs={12} md={6} lg={4} className='my-3 col-item'>
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
        >
          <div className='real-state-card'>
            <Link to={`/real-state/${this.props.realState._id}`}>
              <div className='card-img'>
                <img
                  src={this.props.realState.general.images[0]}
                  alt='real-state-img'
                />
              </div>
            </Link>

            <div className='info-container'>
              <Link to={`/real-state/${this.props.realState._id}`}>
                <p>
                  المساحة : {''}
                  {this.props.realState.space}
                  م2
                </p>
                <p>السعر : {formatter(this.props.realState.price)}</p>
                <p>الدولة : {this.props.realState.location.state}</p>
                <p>عدد المشاهدات : {this.props.realState.views.length}</p>
                <p>
                  الوقت : منذ {dataFormatter(this.props.realState.createdAt)}
                </p>
              </Link>
              <div className='action-btn'>
                <Link
                  to='/me/real-states/favorite'
                  className='delete'
                  //   onClick={() => handleDelete(this.props.realState._id)}
                >
                  <FontAwesomeIcon icon={faTrash} size='3x' />
                </Link>
              </div>
            </div>
            {new Date(this.props.realState.createdAt).getMonth() + 1 >
              new Date().getMonth() &&
              !this.props.realState.propertyStatus === 'rented' &&
              !this.props.realState.propertyStatus === 'sold' && (
                <p className='new'>حديثاً</p>
              )}
            {this.props.realState.placement === 'sale' &&
              this.props.realState.propertyStatus === 'available' && (
                <div className='sale'>بيع</div>
              )}
            {this.props.realState.placement === 'rent' &&
              this.props.realState.propertyStatus === 'available' && (
                <div className='rent'>إيجار</div>
              )}
            {this.props.realState.placement === 'rent' &&
              this.props.realState.propertyStatus === 'rented' && (
                <div className='rented'>تم الإيجار</div>
              )}
            {this.props.realState.placement === 'sale' &&
              this.props.realState.propertyStatus === 'sold' && (
                <div className='sold'>تم البيع</div>
              )}

            {this.props.realState.propertyStatus === 'available' &&
              this.props.realState.urgent === true && (
                <div className='urgent'>عاجل</div>
              )}
          </div>
        </Slider>
      </Col>
    );
  }
}
