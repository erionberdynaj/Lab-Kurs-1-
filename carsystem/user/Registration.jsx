import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FormGroup, Button, Container, Col, Row } from 'reactstrap';
import drive from "../../assets/all-images/drive.jpg"



function Registration() {
  
 
        const [Id, setId] = useState("");
        const [FirstName, setName] = useState("");
        const [LastName, setlname] = useState("");
        const [Email, setemail] = useState("");
        const [Password, setpassword] = useState("");
        const [confirmPassword, setconfirmpassword] = useState("");
        const [role, setrole] = useState("client");
        const [message, setMessage] = useState('');
        const navigate = useNavigate();

         const handleSubmit =  async(event) => {
              event.preventDefault();
            
          
            // Compare the values and show an error message if they don't match
            if (Password !== confirmPassword) {
              
              setMessage('Passwords do not match');
              return;
            }
            
          
            
            try {
              const response = await axios.post("https://localhost:7220/api/User/Register", {
               
                FirstName: FirstName,
                Email: Email,
                Password: Password,
                LastName: LastName,
                role:role,
                
                
                
                
            
              
              });
              alert("Registation Successfully");
              setMessage(response.data);
                  setId("");
                  setName("");
                  setlname("");
                  setemail("");
                  setpassword("");
                  setconfirmpassword("");
                  setrole("");
                  navigate("/login");
                  
                
                
            
            
             
            } catch (err) {
              alert(err.response.data);
            }
          }
  return (
    
     <div >
       <br /> <br /> <br />
     <Container>
            <Row>
            <Col xs="6" ><img src={drive} className="img-fluid" /></Col>
            <Col  xs="6" >
        <form onSubmit={handleSubmit} className='login_form'>

            <input type='text' id='Id' value={Id} 
              onChange={(event) => {
                setId(event.target.value);
              }} hidden/>
             <FormGroup>
               <label>First Name</label>
            <input type='text' id='FisrtName' value={FirstName} class="form-control"
              onChange={(event) => {
                setName(event.target.value);
              }} />
              </FormGroup>
              <FormGroup>
              <label>Last Name</label>
            <input type='text' id='LastName'  value={LastName} class="form-control"
              onChange={(event) => {
                setlname(event.target.value);
              }} />
              </FormGroup>
              <FormGroup>
            <label>Email</label>
            <input type='email' id='Email'  value={Email} class="form-control"
              onChange={(event) => {
                setemail(event.target.value);
              }} />
            </FormGroup>
            <FormGroup>
            <label>Password</label>
            <input type='password' id='password' name='password' value={Password} class="form-control"
              onChange={(event) => {
                setpassword(event.target.value);
              }} />
              </FormGroup>
              <FormGroup>
            <label>Confirm Password</label>
            <input type='password' id='repeat_password'  name='repeat_password' value={confirmPassword} class="form-control"
              onChange={(event) => {
                setconfirmpassword(event.target.value);
              }}
              />
              </FormGroup>
               
             
             
            <Button>Save</Button>
            <Link to={"/login"} style={{marginLeft: '80px'}}>Press here to Log In </Link>
            <br/><br/>
           
            
        </form>
        </Col>
        </Row>
       </Container>
       <br /> <br />    <br /> <br />    <br /> <br /> 
      
      
        
    </div>

  )
}

export default Registration