import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import BookingForm from '../components/UI/BookingForm';
import PaymentMethod from '../components/UI/PaymentMethod';
import { useNavigate } from 'react-router-dom';
const CarDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();
  const [carData, setCarData] = useState([]);
  const [singleCarItem, setSingleCarItem] = useState(null);
  const token = localStorage.getItem('token'); // Get the token from local storage (assuming it is stored there)
  if (!token) {
       navigate('/login'); // Redirect to the login page if the token is not set
//  //   // Return early to prevent further execution of the function
  }
  // Function to extract query parameters from the URL
  const getQueryParam = (name) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(name);
  };

  // Get the 'id' query parameter
  const id = getQueryParam('id');
  console.log('vesa', id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7112/api/Cars/GetCar');
        setCarData(response.data);

        // Find the single car item after setting carData
        const foundCar = response.data.find((item) => item.carName === slug);
        setSingleCarItem(foundCar);

        console.log('AASDASDSA');
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  return (
    <Helmet title={singleCarItem ? singleCarItem.carName : 'Car Details'}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              {singleCarItem && <img src={singleCarItem.imgUrl} alt="" className="w-100" />}
            </Col>

            <Col lg="6">
              {singleCarItem && (
                <div className="car__info">
                  <h2 className="section__title">{singleCarItem.carName}</h2>

                  <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                    <h6 className="rent__price fw-bold fs-4">${singleCarItem.price}.00 / Day</h6>

                    <span className=" d-flex align-items-center gap-2">
                      <span style={{ color: '#f9a826' }}>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      ({singleCarItem.rating} ratings)
                    </span>
                  </div>

                  <p className="section__description">{singleCarItem.description}</p>

                  <div className=" d-flex align-items-center mt-3" style={{ columnGap: '4rem' }}>
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i class="ri-roadster-line" style={{ color: '#f9a826' }}></i> {singleCarItem.model}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i class="ri-settings-2-line" style={{ color: '#f9a826' }}></i> {singleCarItem.automatic}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i class="ri-timer-flash-line" style={{ color: '#f9a826' }}></i> {singleCarItem.speed}
                    </span>
                  </div>

                  <div className=" d-flex align-items-center mt-3" style={{ columnGap: '2.8rem' }}>
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i class="ri-map-pin-line" style={{ color: '#f9a826' }}></i> {singleCarItem.gps}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i class="ri-wheelchair-line" style={{ color: '#f9a826' }}></i> {singleCarItem.seatType}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i class="ri-building-2-line" style={{ color: '#f9a826' }}></i> {singleCarItem.brand}
                    </span>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="7" className="mt-5">
              {singleCarItem && (
                <div className="booking-info mt-5">
                  <h5 className="mb-4 fw-bold ">Booking Information</h5>
                  <BookingForm id={id} price={singleCarItem.price} />
                </div>
              )}
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
