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
    setPasswordVisible((prevState) => !prevState);
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
        localStorage.setItem('isLoggedIn', 1)
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
            <div className="input">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Írd be a jelszót"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
              />
              <button
                onClick={togglePasswordVisibility}
                style={{
                  marginLeft: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  padding: "5px",
                }}
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
    </div>
  );
};

export default Loginscreen;
