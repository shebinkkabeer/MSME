import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getProduction } from "../admin/helper/adminapicall";

const CompanyDashBoard = ({ match }) => {
  const tokrole = JSON.parse(localStorage.getItem("jwt"));
  const token = tokrole.access_token;

  const [values, setValues] = useState({
    name: "",
    production: [],
  });

  const { name, production } = values;

  const preload = (companyId) => {
    getProduction(token, companyId)
      .then((response) => {
        setValues({
          ...values,
          production: response.productions,
          name: response.name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload(match.params.companyId);
  }, []);

  const companyId = match.params.companyId;

  //  var number=[]
  //  if(production.length===0){
  //   number="No Productions"
  // }
  // else{
  //   number = production.map(a => a.name);
  //   var a=number.join();
  //   number=a;

  // }

  const companyLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              to={`/admin/add/production/${companyId}`}
              className="nav-link text-info"
            >
              Add Production
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/manage/company" className="nav-link text-info">
              Company Home
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const fun = () => {
    return production.length ? (
      production.map((pro, index) => {
        return (
          <p key={index} className="list-group-item">
            Production {index + 1} :
            <Link to={`/admin/production/${pro._id}`}> {pro.name} </Link>
          </p>
        );
      })
    ) : (
      <li className="list-group-item">Productions : No Productions</li>
    );
  };

  return (
    <Base
      title="Welcome to Company area"
      description="Manage all of your Company Data here"
      className="container-fluid bg-info p-4"
    >
      <div className="row">
        <div className="container col-4">{companyLeftSide()}</div>
        <div className="container-fluid col-8">
          <div className="card mb-4">
            <h4 className="card-header">Company Information</h4>
            <ul className="list-group">
              <li className="list-group-item">Company Name : {name}</li>

              {fun()}

              <li className="list-group-item">
                <span className="badge badge-danger">Company Area</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default CompanyDashBoard;
