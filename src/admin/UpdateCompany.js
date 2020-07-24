import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCompany, getaCompany, updateCompany } from "./helper/adminapicall";

const UpdateCompany = ({ match }) => {
  const tokrole = JSON.parse(localStorage.getItem("jwt"));
  const token = tokrole.access_token;

  const [values, setValues] = useState({
    name: "",
    description: "",
    address: "",
    contact: "",
    newName: "",
    error: false,
    loading: false,
    getaRedirect: false,
  });

  const {
    name,
    description,
    address,
    contact,
    newName,
    error,
    loading,
    getaRedirect,
  } = values;

  const preload = (companyId) => {
    getaCompany(token, companyId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.name,
          address: data.address,
          contact: data.contact,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.companyId);
  }, []);
  // console.log({token});
  // console.log(user._id);
  // console.log(match.params.categoryId);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateCompany(match.params.companyId, token, {
      name,
      description,
      address,
      contact,
    }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          address: "",
          contact: "",
          newName: true,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: newName ? "" : "none" }}
    >
      <h4>Updation successfull</h4>
    </div>
  );

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

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Type new Name</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("name")}
          value={name}
          autoFocus
          required
          placeholder=""
        />

        <p className="lead">Type new description</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("description")}
          value={description}
          autoFocus
          required
          placeholder=""
        />

        <p className="lead">Type new address</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("address")}
          value={address}
          autoFocus
          required
          placeholder=""
        />

        <p className="lead">Type new contact</p>
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
          update Company
        </button>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  return (
    <Base
      title="Welcome to Company Updation Section!"
      description="Update Company Details Here... "
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCompany;
