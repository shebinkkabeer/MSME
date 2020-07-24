import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createProduction } from "./helper/adminapicall";


const AddProduction = ({match}) => {
  const [values, setValues] = useState({
      name:"",
      success:"",
      error:""
  })

  const {name,success,error}=values;

  const tokrole=JSON.parse(localStorage.getItem("jwt"));
  const token=tokrole.access_token;
  const companyId=match.params.companyId;

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to={`/admin/company/dashboard/${companyId}`}>
        Company Dashboard
      </Link>
    </div>
  );

  const handleChange = name=> event => {
    setValues({ ...values, error: "", name: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", success: "" });

    //backend request fired
    createProduction(token,companyId,name).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });

      } else {
        setValues({
            ...values,
            name: "",
            error:"",
            success:true,
        
          });
      }
    });
   };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Production created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to Create Production</h4>;
    }
  };

  const addProductionForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the Production</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("name")}
          value={name}
          autoFocus
          required
          placeholder=""
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Production
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a Production here"
      description="Add a new Production for the Company"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {addProductionForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduction;