import React, { useEffect, useState } from "react";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../features/UserData";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Update() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [updatedData, setUpdateData] = useState({
    fname: "",
    lname: "",
    email: "",
    city: "",
    age: "",
  });

  useEffect(() => {
    setUpdateData({
      fname: localStorage.getItem("FirstName"),
      lname: localStorage.getItem("LastName"),
      email: localStorage.getItem("Username"),
      age: localStorage.getItem("Age"),
      city: localStorage.getItem("City"),
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      updatedData.fname &&
      updatedData.lname &&
      updatedData.age &&
      updatedData.city &&
      updatedData.email !== ""
    ) {
      updateSubmit(id);
    } else {
      setErrorMessage("Please enter every details");
    }
  };

  const updateSubmit = (id) => {
    dispatch(
      UpdateUser({
        id,
        fname: updatedData.fname,
        lname: updatedData.lname,
        email: updatedData.email,
        age: updatedData.age,
        city: updatedData.city,
      })
    );
    navigate("/read");
  };

  const onChange = (e) => {
    setUpdateData({ ...updatedData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <MDBValidation className="row g-3 mt-5 ">
        <h2 className="form-heading">Form Input</h2>
        <MDBValidationItem className="col-md-4">
          <MDBInput
            value={updatedData.fname}
            name="fname"
            onChange={onChange}
            id="validationCustom01"
            required
            label="First name"
          />
        </MDBValidationItem>
        <MDBValidationItem className="col-md-4">
          <MDBInput
            value={updatedData.lname}
            name="lname"
            onChange={onChange}
            id="validationCustom02"
            required
            label="Last name"
          />
        </MDBValidationItem>
        <MDBValidationItem
          feedback="Please choose a username."
          invalid
          className="col-md-4"
        >
          <MDBInputGroup>
            <MDBInput
              value={updatedData.email}
              name="email"
              onChange={onChange}
              id="validationCustom04"
              required
              label="@Username"
            />
          </MDBInputGroup>
        </MDBValidationItem>
        <MDBValidationItem
          className="col-md-6"
          feedback="Please provide a valid city."
          invalid
        >
          <MDBInput
            value={updatedData.age}
            name="age"
            onChange={onChange}
            id="validationCustom03"
            required
            label="Age"
          />
        </MDBValidationItem>
        <MDBValidationItem
          className="col-md-6"
          feedback="Please provide a valid zip."
          invalid
        >
          <MDBInput
            value={updatedData.city}
            name="city"
            onChange={onChange}
            id="validationCustom05"
            required
            label="City"
          />
        </MDBValidationItem>

        <MDBValidationItem
          className="col-12"
          feedback="You must agree before submitting."
          invalid
        ></MDBValidationItem>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <div className="col-12">
          <Link to="/read">
            <MDBBtn type="submit" onClick={handleSubmit}>
              Update
            </MDBBtn>
          </Link>
        </div>
      </MDBValidation>
    </>
  );
}
