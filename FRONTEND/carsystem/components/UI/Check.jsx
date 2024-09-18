import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from "reactstrap";

function Check() {
    const location = useLocation();
    const formData = location.state;
    const navigate = useNavigate();
    if (!formData) {
      // Handle the case where there is no form data
      return <p>No form data available</p>;
    }

    async function save(event) {
    


        event.preventDefault();
        try {
            const response = await axios.post("https://localhost:7112/api/Reservations/PostReservation", {
            
            firstName: formData.firstName,
            lasttName: formData.lasttName,
            pickUpDate: formData.pickUpDate,
            dropOffDate: formData.dropOffDate,
            phone: formData.phone,
            description: formData.description,
            total: formData.discountedPrice,
            userId: formData.userId,
            carID: formData.carID,
            priceDay:formData.priceDay,
           
            
          
          });
    
          alert("Reservation Successfully")
          navigate("/cars")
    
         
              
          
        
          
        } catch (err) {
          alert(err);
        }
      }
  
    return (
      <div>
        <br /><br />
        <Row>
        <Col
      className="bg-light border"
      md={{
        offset: 3,
        size: 6
      }}
      sm="12"
    >
        
        {formData.discountedPrice != formData.total && (
        <h1>Congratulations! You've received a 20% discount on your purchase</h1>
      )} 
      
        <br />
        <h4>Check Reservation</h4>
        <br />
        <p>First Name: {formData.firstName}</p>
        <p>Last Name: {formData.lasttName}</p>
        <p>Pick Up Date: {formData.pickUpDate}</p>
        <p>Drop Off Date: {formData.dropOffDate}</p>
        <p>Phone: {formData.phone}</p>
        <p>Car id: {formData.carID}</p>
        <p>Price Day: {formData.priceDay} $</p>
        <p>Description: {formData.description}</p>
        <p>UserId: {formData.userId}</p>
        <p>Total: {formData.discountedPrice}</p>
        <button class="btn btn-primary m-4" onClick={save}>
            Reserve Now
            </button>
            </Col>
      </Row>
      <br />
      <br />
      </div>
      
    );
  };

export default Check