import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/bmw-offer.png";

const AboutSection = () => {
  return (
    <section
      className="about__section"
      style={
      
          
           { marginTop: "20px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to car rent service</h2>
              <p className="section__description">
              "Embark on a seamless journey with our premier car rental service, where convenience meets comfort. At  Rental Service, we redefine your travel experience by offering a diverse fleet of vehicles, from sleek sedans to spacious SUVs, ensuring you find the perfect ride for every occasion.

Explore the freedom to go wherever the road takes you with our flexible rental options and competitive pricing. Whether it's a weekend getaway, a business trip, or an extended vacation, our user-friendly platform makes booking your ideal car a breeze.

We prioritize your safety and satisfaction, providing well-maintained vehicles equipped with the latest features. Our commitment to excellence extends to our customer support team, ready to assist you at every step of your journey.

              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Family-Friendly Adventures
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Luxury Unleashed
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Budget-Friendly Getaways
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Business-Class Mobility
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
