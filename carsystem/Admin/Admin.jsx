// AdminDashboard.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Nav, NavItem } from 'reactstrap';
import { FaHome, FaUser, FaCog, FaChartBar,FaCar,FaCalendarAlt } from 'react-icons/fa';
import CarsForm from './CarsForm';
import { Link ,Route, Router} from 'react-router-dom';
import Reservation from './Reservation';
import AdminBlogs from './AdminBlogs';
import { useEffect, useState, useRef } from "react";
import AdminContact from './AdminContact';

const Admin = () => {
    const [activeComponent, setActiveComponent] = useState('reservations');


  return (
    <Container fluid>
      {/* Navbar */}
      

      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-dark text-white p-3">
          
          <Nav vertical>
          <button onClick={() => setActiveComponent('reservations')}>Load Reservations</button>
          <button onClick={() => setActiveComponent('cars')}>Load Cars</button>
        
        <button onClick={() => setActiveComponent('blogs')}>Load Blogs</button>
        <button onClick={() => setActiveComponent('contacts')}>Load Contacts</button>

            {/* Add more links as needed */}
          </Nav>
        </Col>

        {/* Main Content Area */}
        <Col md={9} className="bg-light p-4">
          <h2>Main Content</h2>
          {activeComponent === 'reservations' && <Reservation />}
          {activeComponent === 'cars' && <CarsForm />}
        
        {activeComponent === 'blogs' && <AdminBlogs />}
        {activeComponent === 'contacts' && <AdminContact />}
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
