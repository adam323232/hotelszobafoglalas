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
    setPasswordVisible((prevState) => !prevState);
  };
  const togglePasswordVisibilitys = () => {
    setPasswordVisibles((prevState) => !prevState);
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
        <div className="col-md-3 mt-5">
          {succes && <Success message="Sikeres regisztráció" />}

          <div className="bs">
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
            <div className="input">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Írd be a jelszót"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
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
            <div className="input">
              <input
                type={passwordVisibles ? "text" : "password"}
                placeholder="Írd be a jelszót"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
                className="form-control"
              />
              <button
                onClick={togglePasswordVisibilitys}
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
                {passwordVisibles ? "🙈" : "👁️"}
              </button>
            </div>

            <br />
            <div className="registerbtn">
              <button
                className="btn btn-primary"
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
