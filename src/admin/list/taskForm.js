import React from "react";
import Popup from "reactjs-popup";
 
const Form =() => {
    return (
        <div className="container p-4 mt-5">
  <Popup trigger={<button> Trigger</button>} position="">
  <form>
  <div className="form-group">
    <p className="lead">Enter Company Name</p>
    <input
      type="text"
      className="form-control my-3"
    
      value="shebin"
      autoFocus
      required
      placeholder=""
    />
    </div></form>
  </Popup>
  </div>
)};

export default Form