import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";

import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import axios from 'axios';


import commentImg from "../assets/all-images/ava-1.jpg";

import "../styles/blog-details.css";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setSingleBlogItem] = useState(null);
  const [blogData, setblogData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7112/api/Blogs/GetBlogs');
        setblogData(response.data);

        const foundblog = response.data.find((item) => item.title === slug);
        setSingleBlogItem(foundblog);
      
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    
    fetchData();
    
  }, [slug]);
  // const blog = blogData.find((blog) => blog.title === slug);

   useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  return (
    <Helmet title={blog ? blog.title : 'Blog Details'}>
      <section>
     
        <Container>
          <Row>
          { blog &&
            <Col lg="8" md="8">
              <div className="blog__details">
                <h2 className="section__title mt-4">{blog.title}</h2>
                <img src={blog.imgUrl} alt="" className="w-100" />
                <div className="blog__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="blog__author">
                    <i class="ri-user-line"></i> {blog.author}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-calendar-line"></i> {blog.date.substr(0, 10)}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-time-line"></i> {blog.time.substr(0, 5)}
                  </span>
                </div>

                <p className="section__description">{blog.description}</p>
                <h6 className="ps-5 fw-normal">
                  <blockquote className="fs-4">{blog.quote}</blockquote>
                </h6>
                <p className="section__description">{blog.description}</p>
              </div>

              
            </Col>}

            <Col lg="4" md="4">
              <div className="recent__post mb-4">
                <h5 className=" fw-bold">Recent Posts</h5>
              </div>
              {blogData.map((item) => (
                <div className="recent__blog-post mb-4" key={item.id}>
                  <div className="recent__blog-item d-flex gap-3">
                    <img src={item.imgUrl} alt="" className="w-25 rounded-2" />
                    <h6>
                      <Link to={`/blogs/${item.title}`}>{item.title}</Link>
                    </h6>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BlogDetails;
