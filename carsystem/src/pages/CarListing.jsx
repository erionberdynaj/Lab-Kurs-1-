import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const CarListing = () => {
  const [carData, setCarData] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('Select');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get the token from local storage (assuming it is stored there)
   if (!token) {
    navigate('/login'); // Redirect to the login page if the token is not set
  //   // Return early to prevent further execution of the function
   }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7112/api/Cars/GetCar');
        setCarData(response.data);
       
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    
    fetchData();
    
  }, []);
  const handleSortChange = (event) => {
    
    setSelectedPrice(event.target.value);

  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };



  const filteredCars = () => {
    let sortedCars = carData.slice();

    if (selectedPrice === 'low') {
      sortedCars = sortedCars.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === 'high') {
      sortedCars = sortedCars.sort((a, b) => b.price - a.price);
    }
    return sortedCars.filter((car) =>
      car.carName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  };
  return (
    <Helmet title="Cars">
      
      <CommonSection title="Car Listing" />
      
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>
                

                <select onChange={handleSortChange} value={selectedPrice}>
                  <option value="Select">Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
               </select>

               <div className="ms-auto">
                <input type="text" placeholder="Search" value={searchTerm}
                    onChange={handleSearchChange} />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
              </div>
              
            </Col>
            

            {filteredCars().map((item) => (
              <CarItem props={item} key={item.id} />
              //  console.log("Cars", item)
              // <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
