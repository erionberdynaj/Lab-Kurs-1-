import React from 'react'
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "reactstrap";


 
function CarsForm() {
 
const [id, setId] = useState("");
const [title, setTitle] = useState("");
const [author, setAuthor] = useState();
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [imgUrl, setImgUrl] = useState();
const [description, setDescription] = useState("");
const [quote, setQuote] = useState("");
const [updatest, setupdate] = useState(false);
const [products, setProducts] = useState([]);
  useEffect(() => {
    
    (async () => await Load() )();
    
  } , []);
  async function Load() {
    
    const result = await axios.get("https://localhost:7112/api/Blogs/GetBlogs");
    setProducts(result.data);

    fillNow();
  }

  const fillNow = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // Get YYYY-MM-DD
    const formattedTime = now.toTimeString().split(' ')[0]; // Get HH:mm:ss

    setDate(formattedDate);
    setTime(formattedTime);
  };
  //per me kthy vleren e input ne null
  const inputFileRef = useRef(null);

  async function save(event) {

    event.preventDefault();
    if (!title || !author || !imgUrl || !description || !quote) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      fillNow();
      await axios.post("https://localhost:7112/api/Blogs/PostBlog", {
        
     
      title : title,
      author : author,
      date : date,
      time : time,
      imgUrl : imgUrl,
      description : description,
      quote : quote,
      
        
      
      });
      alert("Registration Successfully");
      setId("");
      setTitle("");
      setAuthor("");
      setDate("");
      setTime("");
      setImgUrl("");
      setDescription("");
      setQuote("");
      inputFileRef.current.value = '';
      
    
      Load();
    } catch (err) {
      alert(err);
    }
  }
 
  
////////////////////////////////////////////////////////////////
  


async function deleteProduct(id) {
  await axios.delete("https://localhost:7112/api/Blogs/" + id);
  alert("Deleted successfully");
  setId("");
  setTitle("");
  setAuthor("");
  // setDate("");
  // setTime("");
  setImgUrl("");
  setDescription("");
  setQuote("");
  setupdate(false);
  Load();
}

async function editProduct(products) {
  setId(products.id);
  setTitle(products.title);
  setAuthor(products.author);
  setDate(products.date);
  setTime(products.time);
  setImgUrl(products.imgUrl);
  setDescription(products.description);
  setQuote(products.quote);
  setupdate(true)
}
async function update(event) {
  event.preventDefault();
  if (!title || !author || !imgUrl || !description || !quote) {
    alert("Please fill all required fields.");
    return;
  }
  try {
    const product = products.find((p) => p.id === id);
    await axios.put("https://localhost:7112/api/Blogs/", {
      id: product.id,
      title : title,
      author : author,
      date : date,
      time : time,
      imgUrl : imgUrl,
      description : description,
      quote : quote,
      
    });
    alert("Registration Updated");
    setId("");
  setTitle("");
  setAuthor("");
  // setDate("");
  // setTime("");
  setImgUrl("");
  setDescription("");
  setQuote("");
    setupdate(false);

    

    Load();
  } catch (err) {
    alert(err);
  }
}



///////////////////////////////////////////////////////////////
  return (
    <div>
      
     
      
 
          <h1>Write Information to Add a Blog</h1>
      <div>
        <form>
        <Row>
        <Col
      className="bg-light border"
      md={{
        offset: 3,
        size: 6
      }}
      sm="12"
    >
          <div class="form-group">
          
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
 
            <label>Title</label>
            <input
              type="text"
              class="form-control"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Author</label>
            <input
              type="text"
              class="form-control"
              value={author}
              onChange={(event) => {
                setAuthor(event.target.value);
              }}
            />
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <input
              type="text"
              class="form-control"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Quote</label>
            <input
              type="text"
              class="form-control"
              value={quote}
              onChange={(event) => {
                setQuote(event.target.value);
              }}
            />
          </div>
         
          <div class="form-group" >
            <label>Image</label>
            <input
              type="file"
              ref={inputFileRef}
              class="form-control"
              id="imgUrl"
              onChange={(event) => {
                setImgUrl("/blog-img/"+event.target.files[0].name);
              }}
            />
          </div>
          <br /><br />
          <div>
            
            {updatest ? (
        <button class="btn btn-warning m-4" onClick={update}>Update</button>
      ) : (
        <button class="btn btn-primary m-4" onClick={save}>Register</button>
      )}
             
            
            

          </div>
              <br /><br />
             
              
            

          </Col>
    </Row>
        </form>
        
      </div>
      <br></br>
 
      <div className="table-responsive m-3">
  <table className="table border-dark ">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Date</th>
        <th scope="col">Time</th>
        <th scope="col">Description</th>
        <th scope="col">Quote</th>
        <th scope="col">Image</th>
        <th scope="col">Options</th>
      </tr>
    </thead>
    <tbody>
      {products.map(function fn(produkt) {
        return (
          <tr key={produkt.id}>
            <td>{produkt.id}</td>
            <td>{produkt.title}</td>
            <td>{produkt.author}</td>
            <td>{produkt.date.substr(0, 10)}</td>
            <td>{produkt.time.substr(0,5)}</td>
            <td>{produkt.description}</td>
            <td>{produkt.quote}</td>
            
            <td>
              <img src={produkt.imgUrl} style={{ maxWidth: '100%', height: 'auto', maxHeight: '150px' }} alt="Product Photo" />
            </td>
            <td >
              <div className="d-flex">
               <button
                type="button"
                className="btn btn-warning mx-1"
                onClick={() => editProduct(produkt)}
              >
                Edit
              </button> 
              <button
                type="button"
                className="btn btn-danger mx-1"
                onClick={() => deleteProduct(produkt.id)}
              >
                Delete
              </button>
              </div>
            </td>

         
      
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


      
    </div>
  )
}

export default CarsForm