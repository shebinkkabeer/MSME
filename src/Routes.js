import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCompany from "./admin/AddCompany";
import ManageCompany from "./admin/ManageCompany";

import UpdateCompany from "./admin/UpdateCompany";

import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import contactUs from "./core/contactUs";
import Card from "./core/Card";
import { signup } from "./auth/helper";
import companyDashBoard from "./user/CompanyDashBoard";
import AddProduction from "./admin/AddProduction";
import ProductionDash from "./admin/ProductionDash";
import Form from "./admin/list/taskForm";
import chumma from "./user/chumma";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/contactUs" exact component={contactUs} />

        <Route path="/" exact component={AdminDashBoard} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <Route path="/admin/dashboard" exact component={AdminDashBoard} />
        <Route path="/admin/create/company" exact component={AddCompany} />
        <Route path="/admin/manage/company" exact component={ManageCompany} />
        <Route
          path="/admin/company/dashboard/:companyId"
          exact
          component={companyDashBoard}
        />

        <Route
          path="/admin/company/update/:companyId"
          exact
          component={UpdateCompany}
        />
        <Route
          path="/admin/add/production/:companyId"
          exact
          component={AddProduction}
        />

        <Route
          path="/admin/production/:productionId"
          exact
          component={ProductionDash}
        />

        <Route
          path="/admin/add/information/:productionId"
          exact
          component={Form}
        />
        <Route path="/admin/create/product" exact component={chumma} />
      </Switch>
    </BrowserRouter>
  );
}
