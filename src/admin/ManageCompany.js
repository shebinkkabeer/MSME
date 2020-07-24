import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getCompany, getProducts ,deleteCategory, deleteCompany} from "./helper/adminapicall";

const ManageCompany = () => {
  const [companies, setCompanies] = useState([]);
  
  
  const tokrole=JSON.parse(localStorage.getItem("jwt"));
  const token=tokrole.access_token;
  const preload = () => {
    getCompany(token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCompanies(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);


  const deleteThisCompany = (token,companyId) => {
  
    
    deleteCompany(token,companyId).then(data => {
      if (data.error) {
        

        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome Admin" description="Manage companies here" className="container p-4">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h6 className="my-4 text-light">Total {companies.length} Companies:</h6>

      <div className="row">
     
          {companies.map((company, index) => {
            return (

          //     <div key={index} className="row text-center my-3 ">
          //     <div  className="col-4">
          //      <h3 className="text-light text-left">{index+1}.{company.name}  {company.address}  </h3>
          //     </div>
          //     <div className="col-4">
          //       <Link
          //         className="btn btn-success"
          //         to={`/admin/company/update/${company._id}`}
          //       ><span>Update</span>
                  
          //       </Link>         
          //     </div>
          //     <div className="col-4">
          //       <button onClick={() => {deleteThisCompany(token,company._id)}} className="btn btn-danger">
          //         Delete
          //       </button>
          //     </div>
          // </div>
          <div key={index} className="col-lg-4 text-dark">
          <div key={index} className=" card bg-light border border-success my-3 ">
          <div className="card-header lead text-center">{company.name}</div>
          <div className="card-body text-center my-3">
           {company.address}

           
           </div>
            <div className="row">
            <div className="col-12 text-center">           
             <Link
            className="btn btn-block  my-3"
            to={`/admin/company/dashboard/${company._id}`}
            
          ><i className="fa fa-eye fa-2x" aria-hidden="true"></i>
            
          </Link> </div>
              <div className="col-6">
              <Link
                      className="btn btn-block btn-primary"
                      to={`/admin/company/update/${company._id}`}
                      
                    ><i className="fa fa-pencil-square fa-2x" aria-hidden="true"></i>
                      
                    </Link> 
              </div>
              <div className="col-6">
              <button onClick={() => {deleteThisCompany(token,company._id)}} className="btn btn-block btn-danger">
              <i className="fa fa-trash fa-2x" aria-hidden="true"></i>     
              </button>
              </div>
            </div>
          </div>
       




          </div> 
              
           )
          
          })}
      </div>


    </Base>
  );
};

export default ManageCompany;
