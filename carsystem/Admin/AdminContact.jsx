import React, { useEffect, useState } from 'react';
import $ from 'jquery';

function AdminContact() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Make the GET request with jQuery
      $.ajax({
        url: 'https://localhost:7112/api/Contacts/GetContact',
        method: 'GET',
        success: function (response) {
          setData(response);
        },
        error: function (xhr, status, error) {
          setError(error);
        },
      });
    }, [data]); // Empty dependency array to run the effect only once on mount
  
    const handleDelete = async (id) => {
      // Make the DELETE request with jQuery
      await $.ajax({
        url: `https://localhost:7112/api/Contacts/${id}`,
        method: 'DELETE',
        success: function () {
            alert("Deleted Successfully")
            
          // If the delete was successful, update the state to remove the deleted item
          setData(prevData => prevData.filter(item => item.Id !== id));

         
        },
        error: function (xhr, status, error) {
          setError(error);
        },
      });
    };
    return (
        <div className="table-responsive m-3">
           <table className="table border-dark ">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map(function fn(rez) {
            return (
              <tr key={rez.id}>
                <td>{rez.id}</td>
                <td>{rez.name}</td>
                <td>{rez.email}</td>
                <td>{rez.message}</td>
               <td> <button
                    type="button"
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(rez.id)}
                  >
                    Delete
                  </button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {error && <p>Error: {error}</p> }
    </div>
      )
}

export default AdminContact