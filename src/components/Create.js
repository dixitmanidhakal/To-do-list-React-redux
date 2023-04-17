import React, { useState } from "react";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { createUser } from "../features/UserData";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    fname: "",
    lname: "",
    email: "",
    city: "",
    age: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formValue.fname &&
      formValue.lname &&
      formValue.age &&
      formValue.city &&
      formValue.email !== ""
    ) {
      isChecked
        ? submitCompletion(formValue)
        : setErrorMessage(
            "You must accpect the terms and condtions to submit the form"
          );
    } else {
      setErrorMessage("Please enter every details");
    }
  };

  const submitCompletion = (formValue) => {
    dispatch(createUser(formValue));
    setFormValue({
      fname: "",
      lname: "",
      email: "",
      age: "",
      city: "",
    });
    setIsChecked(false);
    navigate("/read");
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handelCheckboxCHange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <MDBValidation className="row g-3 mt-5 ">
        <h2 className="form-heading">Form Input</h2>
        <MDBValidationItem className="col-md-4">
          <MDBInput
            value={formValue.fname}
            name="fname"
            onChange={onChange}
            id="validationCustom01"
            required
            label="First name"
          />
        </MDBValidationItem>
        <MDBValidationItem className="col-md-4">
          <MDBInput
            value={formValue.lname}
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
              value={formValue.email}
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
            value={formValue.age}
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
            value={formValue.city}
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
        >
          <MDBCheckbox
            label="Agree to terms and conditions"
            id="invalidCheck"
            required
            checked={isChecked}
            onChange={handelCheckboxCHange}
          />
        </MDBValidationItem>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <div className="col-12">
          <MDBBtn type="submit" onClick={handleSubmit}>
            Submit
          </MDBBtn>
        </div>
      </MDBValidation>
    </>
  );
}
