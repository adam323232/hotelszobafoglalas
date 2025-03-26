import React, { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link } from "react-router-dom";

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
      setError(null); // Hibaüzenet törlése az új próbálkozás előtt
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
        setError("Ilyen felhasználó nem létezik"); // Hibaüzenet beállítása
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
      <div className="row logindiv justify-content-center mt-5">
        <div>
          <div className="error">
            {error && <Error message="Nem létezik ilyen felhasználó" />}
          </div>
          <div
            className="bs"
            style={{
              width: "400px",
              margin: "10em auto",
            }}
          >
            <h2 className="bh2">Bejelentkezés</h2>
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
            <p className="p">
              Ha még nem vagy registrálva akkor: <Link to="/register">Regisztráció</Link>
            </p>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default Loginscreen;
