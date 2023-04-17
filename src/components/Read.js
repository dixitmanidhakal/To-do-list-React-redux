import React, { useEffect } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../features/UserData";

export default function Read() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const data = useSelector((state) => state.app.users);

  const setData = (fname, lname, email, age, city) => {
    localStorage.setItem("FirstName", fname);
    localStorage.setItem("LastName", lname);
    localStorage.setItem("Username", email);
    localStorage.setItem("Age", age);
    localStorage.setItem("City", city);
  };

  if (data.loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <MDBTable align="middle mt-5">
      <MDBTableHead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Age</th>
          <th scope="col">Status</th>
          <th scope="col">City</th>
          <th scope="col">Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((items) => (
          <tr key={items.id}>
            <td>
              <div className="fullname d-flex align-items-center">
                <div className="ms-3">
                  <p className=" fw-bold mb-1">
                    {items?.fname}
                    <span className="lastname">{items?.lname}</span>
                  </p>
                  <p className="text-muted mb-0">{items?.email}</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">{items?.age}</p>
            </td>
            {items?.age > 18 ? (
              <td>
                <MDBBadge color="success" pill>
                  Eligible
                </MDBBadge>
              </td>
            ) : (
              <td>
                <MDBBadge color="danger" pill>
                  Not Eligible
                </MDBBadge>
              </td>
            )}
            <td>{items?.city}</td>
            <td>
              <Link to={`/update/${items?.id}`}>
                <MDBBtn
                  color="link"
                  rounded
                  size="sm"
                  onClick={() =>
                    setData(
                      items?.fname,
                      items?.lname,
                      items?.email,
                      items?.age,
                      items?.city
                    )
                  }
                >
                  Edit
                </MDBBtn>
              </Link>
              <MDBBtn
                color="link"
                rounded
                size="sm"
                onClick={() => dispatch(deleteUser(items?.id))}
              >
                Delete
              </MDBBtn>
            </td>
          </tr>
        ))}
        <div>
          <Link to="/">
            <h6 className="home">
              ←<u> Back to home</u>
            </h6>
          </Link>
        </div>
      </MDBTableBody>
    </MDBTable>
  );
}
