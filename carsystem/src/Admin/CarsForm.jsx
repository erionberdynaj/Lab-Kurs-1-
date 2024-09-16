import React from 'react'
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "reactstrap";


 
function CarsForm() {
 
const [id, setId] = useState("");
const [brand, setbrand] = useState("");
const [rating, setrating] = useState();
const [carName, setcarName] = useState("");
const [imgUrl, setimgUrl] = useState("");
const [model, setmodel] = useState("");
const [price, setprice] = useState();
const [speed, setspeed] = useState("");
const [gps, setgps] = useState("");
const [seatType, setseatType] = useState("");
const [automatic, setautomatic] = useState("");
const [description, setdescription] = useState("");
const [updatest, setupdate] = useState(false);
const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {
    
    const result = await axios.get("https://localhost:7112/api/Cars/GetCar");
    setProducts(result.data);
    
  }
  //per me kthy vleren e input ne null
  const inputFileRef = useRef(null);
  async function save(event) {
    


    event.preventDefault();
    if (!brand || !rating || !carName || !model || !price || !speed || !gps || !seatType || !automatic || !description || !imgUrl) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      await axios.post("https://localhost:7112/api/Cars/PostCar", {
        
     
      brand : brand,
      rating : rating,
      carName : carName,
      imgUrl : imgUrl,
      model : model,
      price : price,
      speed : speed,
      gps : gps,
      seatType : seatType,
      automatic: automatic,
      description : description
        
      
      });
      alert("Registation Successfully");
      setId("");
      setbrand("");
      setrating("");
      setcarName("");
      setimgUrl("");
      setmodel("");
      setprice("");
      setspeed("");
      setgps("");
      setseatType("");
      setautomatic("");
      setdescription("");
      inputFileRef.current.value = '';
      
    
      Load();
    } catch (err) {
      alert(err);
    }
  }
 
  
////////////////////////////////////////////////////////////////
  


async function deleteProduct(id) {
  await axios.delete("https://localhost:7112/api/Cars/" + id);
  alert("Deleted successfully");
  setId("");
  setbrand("");
  setrating("");
  setcarName("");
  setimgUrl("");
  setmodel("");
  setprice("");
  setspeed("");
  setgps("");
  setseatType("");
  setautomatic("");
  setdescription("");
  setupdate(false);
  Load();
}

async function editProduct(products) {
  setId(products.id);
  setbrand(products.brand);
  setrating(products.rating);
  setcarName(products.carName);
  setmodel(products.model);
  setprice(products.price);
  setspeed(products.speed);
  setgps(products.gps);
  setseatType(products.seatType);
  setautomatic(products.automatic);
  setdescription(products.description);
  setimgUrl(products.imgUrl);
  setupdate(true)
}
async function update(event) {
  event.preventDefault();
  if (!brand || !rating || !carName || !model || !price || !speed || !gps || !seatType || !automatic || !description || !imgUrl) {
    alert("Please fill all required fields.");
    return;
  }
  
  try {
    const product = products.find((p) => p.id === id);
    await axios.put("https://localhost:7112/api/Cars/", {
      id: product.id,
      brand : brand,
      rating : rating,
      carName : carName,
      imgUrl : imgUrl,
      model : model,
      price : price,
      speed : speed,
      gps : gps,
      seatType : seatType,
      automatic: automatic,
      description : description
    });
    alert("Registration Updated");
    setId("");
    setbrand("");
    setrating("");
    setcarName("");
    setimgUrl("");
    setmodel("");
    setprice("");
    setspeed("");
    setgps("");
    setseatType("");
    setautomatic("");
    setdescription("");
    setupdate(false);

    

    Load();
  } catch (err) {
    alert(err);
  }
}



///////////////////////////////////////////////////////////////
  return (
    <div>
      
     
      
 
          <h1>Write Information to Add a Car</h1>
      <div>
        <Form  >
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
          
            <label>Brand</label>
            <input
              type="text" 
              class="form-control"
              value={brand}
              onChange={(event) => {
                setbrand(event.target.value);
              }}
              required
            />
          </div>
          <div class="form-group">
            <label>Rating</label>
            <input
              type="number" 
              class="form-control"
              value={rating}
              onChange={(event) => {
                setrating(event.target.value);
              }}
              required
            />
          </div>
          <div class="form-group">
            <label>Type</label>
            <input
              type="text" required
              class="form-control"
              value={carName}
              onChange={(event) => {
                setcarName(event.target.value);
              }}
            />
          </div>
        
          <div class="form-group">
            <label>Model</label>
            <input
              type="text" 
              class="form-control"
              value={model}
              onChange={(event) => {
                setmodel(event.target.value);
              }}
              required
            />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input
              type="number" required
              class="form-control"
              value={price}
              onChange={(event) => {
                setprice(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Speed</label>
            <input
              type="text" required
              class="form-control"
              value={speed}
              onChange={(event) => {
                setspeed(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>GPS</label>
            <input
              type="text" required
              class="form-control"
              value={gps}
              onChange={(event) => {
                setgps(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Seat Type</label>
            <input
              type="text" required
              class="form-control"
              value={seatType}
              onChange={(event) => {
                setseatType(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Transmission</label>
            <input
              type="text" required
              class="form-control"
              value={automatic}
              onChange={(event) => {
                setautomatic(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input
              type="text" required
              class="form-control"
              value={description}
              onChange={(event) => {
                setdescription(event.target.value);
              }}
            />
           
          </div>
          <div class="form-group" >
            <label>Image</label>
            <input
              type="file" required
              ref={inputFileRef}
              class="form-control"
              id="imgUrl"
              onChange={(event) => {
                setimgUrl("/cars-img/"+event.target.files[0].name);
              }}
            />
          </div>
          <br /><br />
          <div>
            {/* <button class="btn btn-primary m-4" onClick={save}>
              Register
              </button>
              <button class="btn btn-warning m-4" onClick={update}>
              Update
            </button> */}
            {updatest ? (
        <button class="btn btn-warning m-4" type="submit" onClick={update}>Update</button>
      ) : (
        <button class="btn btn-primary m-4"  type="submit" onClick={save}>Register</button>
      )}
             
            
            

          </div>
              <br /><br />
             
              
            

          </Col>
    </Row>
        </Form>
        
      </div>
      <br></br>
 
      <div className="table-responsive m-3">
  <table className="table border-dark ">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Brand</th>
        <th scope="col">Rating</th>
        <th scope="col">Type</th>
        <th scope="col">Model</th>
        <th scope="col">Price</th>
        <th scope="col">Speed</th>
        <th scope="col">Gps</th>
        <th scope="col">Seat Type</th>
        <th scope="col">Transmission</th>
        <th scope="col">Description</th>
        <th scope="col">Image</th>
        <th scope="col">Options</th>
      </tr>
    </thead>
    <tbody>
      {products.map(function fn(produkt) {
        return (
          <tr key={produkt.id}>
            <td>{produkt.id}</td>
            <td>{produkt.brand}</td>
            <td>{produkt.rating}</td>
            <td>{produkt.carName}</td>
            <td>{produkt.model}</td>
            <td>{produkt.price}</td>
            <td>{produkt.speed}</td>
            <td>{produkt.gps}</td>
            <td>{produkt.seatType}</td>
            <td>{produkt.automatic}</td>
            <td>{produkt.description}</td>
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