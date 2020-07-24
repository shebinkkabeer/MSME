import React from "react";
import {
  getInformation,
  getSupplier,
  getActivity,
} from "./helper/adminapicall";
import Base from "../core/Base";
import Popup from "reactjs-popup";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Link } from "react-router-dom";

import axios from "axios";

export default class ProductionDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      information: [],
      supplier: [],
      activity: [],
      name: "",
      name1: "",
      description: "",
      description1: "",
      infoerror: false,
      supplyerror: false,
      activityerror: false,
      radio: "",
      name4: "",
      lot: "",
      equipment: "",
      supervisor: "",
      op_count: "",
      op_cost: "",
      material: "",
      cycle: "",
      rejection: "",
      description4: "",
      wait: "",
    };
  }
  componentDidMount() {
    const productionId = this.props.match.params.productionId;
    const tokrole = JSON.parse(localStorage.getItem("jwt"));
    const token = tokrole.access_token;

    getInformation(token, productionId)
      .then((data) => {
        if (data.error) {
          this.setState({ infoerror: data.error });
        } else {
          this.setState({ information: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getSupplier(token, productionId)
      .then((data) => {
        if (data.error) {
          this.setState({ supplyerror: data.error });
        } else {
          this.setState({ supplier: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getActivity(token, productionId)
      .then((data) => {
        if (data.error) {
          this.setState({ activityerror: data.error });
        } else {
          this.setState({ activity: data.activities });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  info = () => {
    return this.state.information.length ? (
      this.state.information.map((info, index) => {
        return (
          <h5 key={index} className="list-group-item mr-5">
            {info.name} : {info.description}
          </h5>
        );
      })
    ) : (
      <li className="list-group-item">No Informations</li>
    );
  };
  sup = () => {
    return this.state.supplier.length ? (
      this.state.supplier.map((data, index) => {
        return (
          <h5 key={index} className="list-group-item mr-5">
            {data.supplier} : {data.interval}
          </h5>
        );
      })
    ) : (
      <li className="list-group-item">No Suppliers</li>
    );
  };

  act = () => {
    return this.state.activity.length ? (
      this.state.activity.map((data, index) => {
        return (
          <h5 key={index} className="list-group-item mr-5">
            {data.type} : {data.name}
          </h5>
        );
      })
    ) : (
      <li className="list-group-item">No Activity</li>
    );
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange1 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange2 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange3 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange4 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.description === "") {
      NotificationManager.error(
        "Please Fill up Required Field . Please check Name and Description Field"
      );
      return false;
    }
    const productionId = this.props.match.params.productionId;
    const tokrole = JSON.parse(localStorage.getItem("jwt"));
    const token = tokrole.access_token;

    let data = {
      production: productionId,
      name: this.state.name,
      description: this.state.description,
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/production/data/information/add`,
        data,
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200)
          NotificationManager.success("Information added Successfully");
        window.location.reload(false);
      })
      .catch((error) => {
        if (error.status && error.response.status !== 200)
          NotificationManager.error("Bad Request");
        else NotificationManager.error("Something Went Wrong");
      });
  };

  handleSubmit1 = (e) => {
    e.preventDefault();
    if (this.state.name1 === "" || this.state.description1 === "") {
      NotificationManager.error("All fields are required");
      return false;
    }
    const productionId = this.props.match.params.productionId;
    const tokrole = JSON.parse(localStorage.getItem("jwt"));
    const token = tokrole.access_token;

    let data = {
      production: productionId,
      supplier: this.state.name1,
      interval: this.state.description1,
    };
    console.log(data);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/production/data/supplier/add`,
        data,
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200)
          NotificationManager.success("Information added Successfully");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.status && error.response.status !== 200)
          NotificationManager.error("Bad Request");
        else NotificationManager.error("Something Went Wrong");
      });
  };

  handleSubmit4 = (e) => {
    e.preventDefault();
    if (
      this.state.name4 === "" ||
      this.state.description4 === "" ||
      this.state.cycle === "" ||
      this.state.op_cost === "" ||
      this.state.op_count === "" ||
      this.state.lot === "" ||
      this.state.material === "" ||
      this.state.equipment === "" ||
      this.state.supervisor === "" ||
      this.state.rejection === ""
    ) {
      NotificationManager.error("All fields are required");
      return false;
    }
    const productionId = this.props.match.params.productionId;
    const tokrole = JSON.parse(localStorage.getItem("jwt"));
    const token = tokrole.access_token;

    let data = {
      production: productionId,
      name: this.state.name4,
      lot_size: this.state.lot,
      equipments: this.state.equipment,
      supervisor_count: this.state.supervisor,
      operator_count: this.state.op_count,
      operator_cost_rate: this.state.op_cost,
      material_cost: this.state.material,
      cycle_time: this.state.cycle,
      rejection: this.state.rejection,
      description: this.state.description4,
    };
    console.log(data);
    // axios
    //   .post(
    //     `${process.env.REACT_APP_BACKEND}/production/data/supplier/add`,
    //     data,
    //     {
    //       headers: {
    //         "auth-token": token,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     if (res.status === 200)
    //       NotificationManager.success("Information added Successfully");
    //     window.location.reload(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.status && error.response.status !== 200)
    //       NotificationManager.error("Bad Request");
    //     else NotificationManager.error("Something Went Wrong");
    //   });
  };

  handleSubmit5 = (e) => {
    e.preventDefault();
    if (
      this.state.name4 === "" ||
      this.state.description4 === "" ||
      this.state.cycle === "" ||
      this.state.wait === ""
    ) {
      NotificationManager.error("All fields are required");
      return false;
    }
    const productionId = this.props.match.params.productionId;
    const tokrole = JSON.parse(localStorage.getItem("jwt"));
    const token = tokrole.access_token;

    let data = {
      production: productionId,
      name: this.state.name4,
      description: this.state.description4,
      waiting_time: this.state.wait,
      cycle_time: this.state.cycle,
      lot_size: null,
      equipments: null,
      supervisor_count: null,
      operator_count: null,
      operator_cost_rate: null,
      material_cost: null,
      rejection: null,
    };
    console.log(data);
    // axios
    //   .post(
    //     `${process.env.REACT_APP_BACKEND}/production/data/supplier/add`,
    //     data,
    //     {
    //       headers: {
    //         "auth-token": token,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     if (res.status === 200)
    //       NotificationManager.success("Information added Successfully");
    //     window.location.reload(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.status && error.response.status !== 200)
    //       NotificationManager.error("Bad Request");
    //     else NotificationManager.error("Something Went Wrong");
    //   });
  };
  ButInfo = () => {
    return (
      <Popup
        trigger={<button className="btn btn-sm btn-success ml-5">Add</button>}
        modal
        position="center center"
        closeOnDocumentClick
      >
        <div className="container-fluid">
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div className="form-group">
              <p className="text-dark">Enter Information</p>
              <textarea
                name="name"
                id="name"
                className="form-control"
              ></textarea>

              <p className="text-dark mt-2">Enter Description</p>
              <textarea
                name="description"
                id="description"
                className="form-control"
              ></textarea>

              <button type="submit" className="btn btn-info my-3">
                Submit
              </button>
              <div className="bg-light">
                <NotificationContainer />
              </div>
            </div>
          </form>
        </div>
      </Popup>
    );
  };

  ButSupply = () => {
    return (
      <Popup
        trigger={<button className="btn btn-sm btn-success ml-5">Add</button>}
        modal
        position="center center"
        closeOnDocumentClick
      >
        <div className="container-fluid">
          <form onSubmit={this.handleSubmit1} onChange={this.handleChange1}>
            <div className="form-group">
              <p className="text-dark">Enter Supplier</p>
              <textarea
                name="name1"
                id="name1"
                className="form-control"
              ></textarea>

              <p className="text-dark mt-2">Enter Time Interval</p>
              <textarea
                name="description1"
                id="description1"
                className="form-control"
              ></textarea>

              <button type="submit" className="btn btn-info my-3">
                Submit
              </button>
              <div className="bg-dark">
                <NotificationContainer />
              </div>
            </div>
          </form>
        </div>
      </Popup>
    );
  };

  form = () => {
    return this.state.radio === "activity" ? (
      <form
        className="form-group"
        onSubmit={this.handleSubmit4}
        onChange={this.handleChange4}
      >
        <div className="row">
          <div className="col-sm">
            <p className="text-dark mt-2">Enter Name</p>
            <textarea
              name="name4"
              id="name4"
              className="form-control"
            ></textarea>
          </div>
          <div className="col-sm">
            <p className="text-dark mt-2">Enter lot size</p>
            <textarea name="lot" id="lot" className="form-control"></textarea>
          </div>

          <div className="col-sm">
            <p className="text-dark mt-2">Enter Equipments</p>
            <textarea
              name="equipment"
              id="equipment"
              className="form-control"
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <p className="text-dark mt-2">Enter Supervisor Count</p>
            <textarea
              name="supervisor"
              id="supervisor"
              className="form-control"
            ></textarea>
          </div>
          <div className="col-sm">
            <p className="text-dark mt-2"> Enter Operators Count</p>
            <textarea
              name="op_count"
              id="op_count"
              className="form-control"
            ></textarea>
          </div>

          <div className="col-sm">
            <p className="text-dark mt-2">Enter Operator Cost Rate</p>
            <textarea
              name="op_cost"
              id="op_cost"
              className="form-control"
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <p className="text-dark mt-2">Enter Material Cost</p>
            <textarea
              name="material"
              id="material"
              className="form-control"
            ></textarea>
          </div>
          <div className="col-sm">
            <p className="text-dark mt-2 ">Enter Cycle Time</p>
            <textarea
              name="cycle"
              id="cycle"
              className="form-control"
            ></textarea>
          </div>

          <div className="col-sm">
            <p className="text-dark mt-2">Enter Rejection</p>
            <textarea
              name="rejection"
              id="rejection"
              className="form-control"
            ></textarea>
          </div>
        </div>
        <div className="text-center">
          <p className="text-dark mt-2 text-center">Enter Desciption</p>
          <textarea
            name="description4"
            id="description4"
            className="form-control"
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-info text-center my-3">
            Submit
          </button>
        </div>
        <div className="bg-dark">
          <NotificationContainer />
        </div>
      </form>
    ) : (
      <form
        className="form-group"
        onSubmit={this.handleSubmit5}
        onChange={this.handleChange4}
      >
        <div className="row">
          <div className="col-sm">
            <p className="text-dark mt-2">Enter Name</p>
            <textarea
              name="name4"
              id="name4"
              className="form-control"
            ></textarea>
          </div>
          <div className="col-sm">
            <p className="text-dark mt-2">Enter Description</p>
            <textarea
              name="description4"
              id="description4"
              className="form-control"
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <p className="text-dark mt-2">Enter Waiting Time</p>
            <textarea name="wait" id="wait" className="form-control"></textarea>
          </div>

          <div className="col-sm">
            <p className="text-dark mt-2">Enter Cycle Time</p>
            <textarea
              name="cycle"
              id="cycle"
              className="form-control"
            ></textarea>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-info text-center my-3">
            Submit
          </button>
        </div>
        <div className="bg-dark">
          <NotificationContainer />
        </div>
      </form>
    );
  };
  ButActivity = () => {
    return (
      <Popup
        trigger={<button className="btn btn-sm btn-success ml-5">Add</button>}
        modal
        offset="0, 50px"
        position="top center"
        closeOnDocumentClick
        size="huge"
      >
        <div className="container-fluid">
          <form onSubmit={this.formSubmit}>
            <p className="text-dark">
              Select Task :{" "}
              <input
                className="text-dark"
                type="radio"
                value="activity"
                name="radio"
                onChange={this.handleChange3}
              />
              activity{" "}
              <input
                className="text-dark ml-2"
                type="radio"
                value="waiting"
                name="radio"
                onChange={this.handleChange3}
                defaultChecked
              />
              waiting
            </p>
            {this.form()}
          </form>
        </div>
      </Popup>
    );
  };

  render() {
    return (
      <Base title="" description="" className="container bg-info p-4">
        <div className="row mb-5">
          <div className="col-12">
            <div className="card mb-4">
              <h4 className="card-header bg-dark text-white text-center">
                Information Flow
                {this.ButInfo()}
              </h4>

              <ul className="list-group">{this.info()}</ul>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <div className="card mb-4">
              <h4 className="card-header bg-dark text-white text-center">
                Server Flow
                {this.ButSupply()}
              </h4>

              <ul className="list-group">{this.sup()}</ul>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <div className="card mb-4">
              <h4 className="card-header bg-dark text-white text-center">
                Activity Flow
                {this.ButActivity()}
              </h4>

              <ul className="list-group">{this.act()}</ul>
            </div>
          </div>
        </div>
      </Base>
    );
  }
}
