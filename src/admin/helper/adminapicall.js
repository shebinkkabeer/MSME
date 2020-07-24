import { API } from "../../backend";
import axios from "axios";

//company calls
export const createCompany = async(token, company) => {
const data=JSON.stringify(company);
return await axios.post(`${API}/company/add`,(data),{headers: {
 "Content-Type": "application/json",
 "auth-token": token
}})
.then(response=> {
return(response.data);
})
.catch(error=>{ 
return {error:error.response.data.message};     
})};
     

//get all companies

export const getCompany = async(token) => {
  
  return await axios.get(`${API}/company/all`,{headers: {
   "auth-token": token
  }})
  .then(response=> {
  return(response.data.companies);
  })
  .catch(error=>{ 
  return( {error:error.response.data.message});   
  })};

 //getaCompany 

 export const getaCompany = async(token,companyId) => {
  
  return await axios.get(`${API}/company/find/${companyId}`,{headers: {
   "auth-token": token
  }})
  .then(response=> {
  return(response.data.details);
  })
  .catch(error=>{ 
    

   return( {error:error.response.data.message});   
  })};
       









 
//update category
export const updateCompany = async(companyId,token, company) => {
  const {name,description,address,contact}=company;
  return await axios.put(`${API}/company/update`,{_id:companyId,name,description,address,contact},{headers: {
   "Content-Type": "application/json",
   "auth-token": token
  }})
  .then(response=> {
  return(response.data);
  })
  .catch(error=>{ 
  return({error:error.response.data.message}); 
   
  })};




//deleteCompany

export const deleteCompany = (token,companyId) => {
  //const id=JSON.stringify(token);
  
  return axios.delete(`${API}/company/delete/${companyId}`,{headers: {
    Accept:"application/json",
    "Content-Type":"application/json",
    "Access-Control-Allow-Origin":"*",
   "auth-token":token
   
  }})
  .then(response=> {
  return(response.data);
  })
  .catch(error=>{ 
    
  console.log( {error:error.response.data.message});   
  })};


//production call

         
export const getProduction = async(token,companyId) => {
  
  return await axios.get(`${API}/production/company/${companyId}`,{headers: {
   "auth-token": token
  }})
  .then(response=> {
  return(response.data);
  })
  .catch(error=>{ 
    

   return( {error:error.response.data.message});   
  })};


  export const createProduction = async(token,companyId,name) => {
 
    return await axios.post(`${API}/production/add`,{company:companyId,production:name},{headers: {
     "auth-token": token
    }})
    .then(response=> {
    return(response.data);
    })
    .catch(error=>{ 
      
  
     return( {error:error.response.data.message});   
    })};


    //major calls

    export const getInformation = async(token,productionId) => {
      
      return await axios.get(`${API}/production/data/information/${productionId}`,{headers: {
       "auth-token": token
      }})
      .then(response=> {
      return(response.data.informations);
      })
      .catch(error=>{ 
        
    
       return({error: error.response.data.message});   
      })};

      export const getSupplier = async(token,productionId) => {
      
        return await axios.get(`${API}/production/data/supplier/${productionId}`,{headers: {
         "auth-token": token
        }})
        .then(response=> {
        return(response.data.suppliers);
        })
        .catch(error=>{ 
          
      
          return( {error:error.response.data.message});   
        })};

        export const getActivity = async(token,productionId) => {
      
          return await axios.get(`${API}/production/data/activity/${productionId}`,{headers: {
           "auth-token": token
          }})
          .then(response=> {
          return(response.data.activities);
          })
          .catch(error=>{ 
            
        
            return( {error:error.response.data.message});   
          })};