import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated, getUser } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const { name, email } = values;

  const preload = () => {
    getUser()
      .then((response) => {
        setValues({ ...values, name: response.name, email: response.email });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    preload();
  }, []);

  const adminLeftSide = () => {
    return (
      <div className="container-fluid">
        <div className="card">
          <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link
                to="/admin/create/company"
                className="nav-link text-success"
              >
                Add Company
              </Link>
            </li>
            <li className="list-group-item">
              <Link
                to="/admin/manage/company"
                className="nav-link text-success"
              >
                Manage Company
              </Link>
            </li>
            <li className="list-group-item">
              <Link
                to="/admin/create/product"
                className="nav-link text-success"
              >
                Create Schedule
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/admin/products" className="nav-link text-success">
                Manage Schedule
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/admin/orders" className="nav-link text-success">
                Manage Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your data here"
      className="container-fluid bg-success p-4"
    >
      <div className="row">
        <div className="col-4">{adminLeftSide()}</div>
        <div className="col-8">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
