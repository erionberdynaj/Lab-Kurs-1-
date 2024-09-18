import React from "react";
import  { useState, useEffect } from 'react';
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Check from "./Check";
import { decodeToken } from '../User/jwtUtils';

const BookingForm = ({id, price}) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  const [pickUpDate, setPickUpDate] = useState('');
  const [dropOffDate, setDropOffDate] = useState('');
  const [dita, setDita] = useState(0);
  const [total, setTotal] = useState();
  
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const navigate = useNavigate();

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [number, setNumber] = useState("");
  const [description, setdescription] = useState("");
  const token = localStorage.getItem('token');
  let idktu;
  if (token) {
    idktu = decodeToken(token).nameid;
  }
    
    // setUserId(idktu)
    
  
  useEffect(() => {
    // Function to calculate the sum and update the total state
   

    const calculateDays = () => {
      if (pickUpDate && dropOffDate) {
        const startDate = new Date(pickUpDate);
        const endDate = new Date(dropOffDate);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setDita(daysDifference);
        
       
      } else {
        setDita(null); // Reset the number of days if dates are not valid
      }
    };


    calculateDays();
    const calculateTotal = () => {
      const sum = dita * price;
      setTotal(sum);
      
    };
    // Call calculateTotal whenever id or price changes
    calculateTotal();
    
  }, [dita, price, pickUpDate, dropOffDate]);

  console.log(total)
  console.log("Dita",dita)
  console.log("Price",price)

 // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const calculateDiscount = async () => {
    if(dita<=0){
      alert("Pick up Date is Incorrect")
      return;
    }
    try {
      const response = await axios.post("https://localhost:7112/api/Reservations/CalculateDiscountedPrice", {
        
 
      firstName: firstName,
      lasttName: lastName,
      pickUpDate: pickUpDate,
      dropOffDate: dropOffDate,
      phone: number,
      carID: id,
      priceDay: price,
      description: description,
      total: total,
      userId: idktu,
     
     
      
    
    });

    
   
      setDiscountedPrice(response.data);
      navigate('/check', {
        state: {
          firstName: firstName,
          lasttName: lastName,
          pickUpDate: pickUpDate,
          dropOffDate: dropOffDate,
          phone: number,
          carID: id,
          priceDay: price,
          description: description,
          total: total,
          userId: idktu,
          discountedPrice: response.data,
          
        },
      });
      
    } catch (error) {
      console.error('Error calculating discount:', error);
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
      <label>First Name </label>
        <input type="text" 
         value={firstName}
         onChange={(e) => setfirstName(e.target.value)}  />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
      <label>Last Name </label>
        <input type="text"  
         value={lastName}
         onChange={(e) => setlastName(e.target.value)} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
      <label>Number </label>
        <input type="text" 
         value={number}
         onChange={(e) => setNumber(e.target.value)}/>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label>Pick Up Date: </label>
        <input
          type="date" 
          value={pickUpDate}
          onChange={(e) => setPickUpDate(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Drop Off Date: </label>
        <input
          type="date" 
          value={dropOffDate}
          onChange={(e) => setDropOffDate(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <label>Number Of Days </label>
        <input type="number" value={dita} readOnly />
      </FormGroup>
  

     
      
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Price for Day</label>
         <input type="number" placeholder="qmimi" defaultValue={price}  readOnly /> 
      </FormGroup>
   
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
      <label>Total</label>
         <input type="number" placeholder="Totali" defaultValue={total} readOnly  /> 
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
       
       <input type="text" placeholder="id" defaultValue={id} hidden /> 
    </FormGroup>
     
     

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>
      </FormGroup>
      
      <div className="payment text-end mt-5">
        <button onClick={calculateDiscount}>Check</button>
      </div>
    
    </Form>
  // After your Form component


    
  );
};

export default BookingForm;
