import React from 'react'
import Popup from "reactjs-popup";
import { useState } from 'react';




 export const Functn=(data)=>{
     
            const tokrole=JSON.parse(localStorage.getItem("jwt"));
            const token=tokrole.access_token;
       
            const [values, setValues] = useState({
               name: "",
               description: "",
               address: "",
               contact:"",
               error: false,
               success: false
             });
           
             const { name,description,address,contact, error, success } = values;
            
            }
export  const ButInfo=(data)=>{
                const productionId=data;
                const [values, setValues] = useState({
                    name: "",
                    description: "",
                    address: "",
                    contact:"",
                    error: false,
                    success: false
                  });
                
    return(
      <Popup trigger={ <button className="btn btn-sm btn-success ml-5">Add</button>}
      modal
      position="center center"
      closeOnDocumentClick>
    <div className="container-fluid">
    <form>
    <div className="form-group">
      <p className="text-dark">Enter Information</p>
      <input
        type="text"
        className="form-control my-3"
        onChange="name"
        value="shh"
        autoFocus
        required
        placeholder=""
      />
      <p className="text-dark">Enter Description</p>
      <input
        type="text"
        className="form-control my-3"
        onChange="description"
        value="ddd"
        autoFocus
        required
        placeholder=""
      />
      <button className="btn btn-info">
          Add information
        </button>
      </div>
      </form>
    </div>
    </Popup>
    
    )}     
    
