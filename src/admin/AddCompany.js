import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCompany } from "./helper/adminapicall";

const AddCompany = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    address: "",
    contact:"",
    error: false,
    success: false
  });

  const { name,description,address,contact, error, success } = values;

  const tokrole=JSON.parse(localStorage.getItem("jwt"));
  const token=tokrole.access_token;
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  
  const handleChange = name => event => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "",success:false});
    

    //backend request fired
    createCompany(token, { name,description,address,contact}).then(data => {
      if (data.error!==undefined) {
        setValues({ ...values, error: data.error});
      } else {
        setValues({
           ...values,
           error: "",
           name:"",
           description:"",
           address:"",
           contact:"",
           success:true,
          });;
      }
    }).catch(()=>{console.log("company creation request Failed")});
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Company added successfully
           
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const myCompanyForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter Company Name</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("name")}
          value={name}
          autoFocus
          required
          placeholder=""
        />
        <p className="lead">Enter Company Description</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("description")}
          value={description}
          autoFocus
          required
          placeholder=""
        />

        <p className="lead">Enter Company Address</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("address")}
          value={address}
          autoFocus
          required
          placeholder=""
        />

        <p className="lead">Enter Company Contact Number</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("contact")}
          value={contact}
          autoFocus
          required
          placeholder=""
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Add Company
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Enter Company Details "
      description="You Can Add Company Here"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCompanyForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCompany;
