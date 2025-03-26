import React, { useState, useEffect } from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const is = Boolean(Number(localStorage.getItem("isLoggedIn")));
    setIsLoggedIn(is);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser);
    if (currentUser && currentUser.user.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div>
          <a href="/">
            <img className="homeicon" src="/img/house.png" alt="" />
          </a>
        </div>
        <a className="navbar-brand" href="/home">
          <button className="button" data-text="Awesome">
            <span className="actual-text">&nbsp;ReZsoBa Rooms&nbsp;</span>
            <span aria-hidden="true" className="hover-text">
              &nbsp;ReZsoBa Rooms&nbsp;
            </span>
          </button>
        </a>
        {isAdmin && isLoggedIn && (
          <a
            href="http://localhost:5000/"
            className="text-white font-bold bg-red-500 px-4 py-2 rounded btn"
          >
            Admin
          </a>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ color: "white" }}>
            <i className="fa-solid fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-5">
            {user ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user"></i>
                    {user.user.name}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="/profile">
                        Profil
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/extrak">
                        Extrák
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={logout}>
                        Kijelentkezés
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/register">
                    Regisztráció
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Belépés
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
