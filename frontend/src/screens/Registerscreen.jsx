import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Succes";
import { Link } from "react-router-dom";
// import axios from 'Axios';

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [succes, setsuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibles, setPasswordVisibles] = useState(false);

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
  const togglePasswordVisibilitys = () => {
    const cursorPosition = document.activeElement.selectionStart;
    setPasswordVisibles((prev) => !prev);
    setTimeout(
      () =>
        document.activeElement.setSelectionRange(
          cursorPosition,
          cursorPosition
        ),
      0
    );
  };

  async function register() {
    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true);
        // const result = await axios.post('http://localhost:5000/api/users/register', user).data
        const response = await fetch(
          "http://localhost:5000/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        console.log(response);

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setLoading(false);
          setsuccess(true);
          window.location.href = "/login";
        }

        setname("");
        setemail("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords not matched");
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-3 mt-5 bs">
          {succes && <Success message="Sikeres regisztráció" />}

          <div>
            <h2>Regisztráció</h2>

            <input
              type="text"
              className="form-control"
              placeholder="Név"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />

            <div className="input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Jelszó"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
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
            <div className="input-container mt-2">
              <input
                type={passwordVisibles ? "text" : "password"}
                className="form-control"
                placeholder="Jelszó megerősítése"
                value={cpassword}
                onChange={(e) => setcpassword(e.target.value)}
              />
              <button
                className="toggle-password"
                onClick={togglePasswordVisibilitys}
                onMouseDown={(e) => e.preventDefault()}
                tabIndex="-1"
                aria-label="Jelszó megjelenítése/elrejtése"
              >
                {passwordVisibles ? "🙈" : "👁️"}
              </button>
            </div>

            <br />
            <div className="registerbtn">
              <button
                className="btn btn-primary w-100"
                onClick={register}
                style={{
                  textAlign: "center !important",
                }}
              >
                Register{" "}
              </button>
              <p className="p">
                Ha már be vagy jelentkezve akkor:{" "}
                <Link to="/login">Belepés</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
