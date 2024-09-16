import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../styles/contact.css";
import CarsForm from "../Admin/CarsForm";
import Reservation from "../Admin/Reservation";
import Admin from "../Admin/Admin";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make the AJAX request using jQuery
    $.ajax({
      type: 'POST',
      url: 'https://localhost:7112/api/Contacts/PostContact',
      data: JSON.stringify(formData),
      contentType: 'application/json',
      success: function (response) {
        setResponseMessage('Message sent successfully!');
       alert("Thank you for reaching out! Our team will contact you shortly.") // You can log the response data if needed
       setFormData({
        name: '',
        email: '',
        message: ''
      });
      },
      error: function (error) {
        setResponseMessage(`Error: ${error.responseText}`);
      }
    });
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                    name="message" value={formData.message} onChange={handleChange} required
                  ></textarea>
                </FormGroup>

                <button className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  Prishtina, Kosova
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+38349100200</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">rentacarsprishtina@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <Link to={"/adminblog"}>test</Link>
      <br />
      <Link to={"/adminres"}>as</Link>
      <br />
      <Link to={"/adminContact"}>sadsa</Link> */}
    </Helmet>
  );
};

export default Contact;
