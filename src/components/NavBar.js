import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavBar() {
  const allUsers = useSelector((state) => state.app.users);
  return (
    <div>
      <>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* Container wrapper */}
          <div className="container-fluid">
            {/* Toggle button */}
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars" />
            </button>
            {/* Collapsible wrapper */}
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* Navbar brand */}
              <Link className="navbar-brand mt-2 mt-lg-0" to="/">
                <img
                  src="https://www.freecodecamp.org/news/content/images/2022/06/crud.png"
                  height={30}
                  alt="MDB Logo"
                  loading="lazy"
                />
              </Link>

              {/* Left links */}

              {/* Collapsible wrapper */}
              {/* Right elements */}
              <div className="d-flex align-items-center">
                {/* Notifications */}
                <div className="dropdown">
                  <Link
                    className="text-reset me-3 dropdown-toggle hidden-arrow"
                    to="/read"
                  >
                    <span>All Post </span>

                    <i className="fas fa-bell" />
                    <span className="badge rounded-pill badge-notification bg-danger">
                      {allUsers.length}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Right elements */}
          </div>
          {/* Container wrapper */}
        </nav>
        {/* Navbar */}
      </>
    </div>
  );
}

export default NavBar;
