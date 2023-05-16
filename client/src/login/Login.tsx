import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import { Default } from "./default";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  let [user, changeUser] = React.useState(Default.user);
  let [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const response = await axios.put(
        "http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/login",
        user
      );
      sessionStorage.setItem("userId", response.data.id);
      sessionStorage.setItem("userName", response.data.username);
      sessionStorage.setItem("role", response.data.role);
      console.log("Response", response.data.username);
      toast.success("Kirjautuminen onnistui!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error("Käyttäjänimi tai salasana väärin!");
        // setErrorMessage("Bad credentials");
      } else {
        toast.error("Jokin meni pieleen :(");
        // setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  const changeUsername = (ev: React.ChangeEvent<HTMLInputElement>) =>
    changeUser(Object.assign({}, user, { username: ev.target.value }));
  const changePassword = (ev: React.ChangeEvent<HTMLInputElement>) =>
    changeUser(Object.assign({}, user, { password: ev.target.value }));

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-4 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-5 text-uppercase">Kirjautuminen</h2>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="username"
                        id="typeUsername"
                        className="form-control form-control-lg"
                        value={user.username}
                        onChange={changeUsername}
                      />
                      <label className="form-label" htmlFor="typeUsername">
                        Käyttäjänimi
                      </label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePassword"
                        className="form-control form-control-lg"
                        value={user.password}
                        onChange={changePassword}
                      />
                      <label className="form-label" htmlFor="typePassword">
                        Salasana
                      </label>
                    </div>
                    <p className="card-text text-danger">{errorMessage}</p>
                    <button className="btn btn-outline-light btn-lg px-5" type="button" onClick={() => navigate("/")}>
                      Takaisin
                    </button>
                    <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleLoginClick}>
                      Kirjaudu
                    </button>
                  </div>
                  <div>
                    <p className="mb-0">
                      Puuttuuko tili?{" "}
                      <a href="#!" className="text-white-50 fw-bold" onClick={() => navigate("/Register")}>
                        Täältä löytyy!
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
