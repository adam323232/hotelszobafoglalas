import React, { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Loginscreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    const cursorPosition = document.activeElement.selectionStart;
    setPasswordVisible((prev) => !prev);
    setTimeout(
      () =>
        document.activeElement.setSelectionRange(
          cursorPosition,
          cursorPosition
        ),
      0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const login = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        setLoading(false);
        localStorage.setItem("isLoggedIn", 1);
        localStorage.setItem("currentUser", JSON.stringify(result));
        window.location.href = "/home";
      } else {
        alert(result.msg);
        setLoading(false);
      }
    };

    login();
  };

  return (
    <div>
      {loading && <Loader />}
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      > */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-3 mt-5">
            {error && <Error message="Nem létezik ilyen felhasználó" />}
            <div className="bs">
              <h2>Bejelentkezés</h2>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="input-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                  onMouseDown={(e) => e.preventDefault()}
                  tabIndex="-1"
                  aria-label="Jelszó megjelenítése/elrejtése"
                >
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
              </div>
              <br />
              <div className="loginbtn">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      {/* </form> */}
    </div>
  );
};

export default Loginscreen;
