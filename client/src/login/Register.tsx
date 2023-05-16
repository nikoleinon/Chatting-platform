import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

export function Register() {
  let [username, changeUsername] = React.useState("");
  let [email, changeEmail] = React.useState("");
  let [password, changePassword] = React.useState("");
  let [repeatPassword, changeRepeatPassword] = React.useState("");
  let navigate = useNavigate();

  function handleSubmit(event: any) {
    event.preventDefault();

    if (!username || !password || !repeatPassword) {
      toast.error("Kaikki kentät ovat pakollisia.");
      return;
    }
    if (validatePasswords()) {
      addUser();
    }
  }

  function validatePasswords() {
    if (password !== repeatPassword) {
      toast.error("Salasanat eivät täsmää, kokeile uudestaan");
      return false;
    }
    return true;
  }

  async function checkUsername(username: any) {
    try {
      const response = await axios.get(
        `http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/users?username=${username}`
      );
      console.log("Response:", response.data);
      if (response.data.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error("Käyttäjänimen tarkistaminen epäonnistui");
      return false;
    }
  }

  async function addUser() {
    const userExists = await checkUsername(username);

    if (userExists) {
      toast.error("Valittu käyttäjänimi on jo käytössä, kokeile toista.");
      return;
    }

    const user = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/users",
        user
      );
      console.log(response.data);
      toast.success("Käyttäjän luominen onnistui!");
      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Rekisteröityminen epäonnistui");
    }
  }

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
                    <h2 className="fw-bold mb-5 text-uppercase">Luo käyttäjä</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="typeUsername"
                          className="form-control form-control-lg"
                          value={username}
                          onChange={(ev) => changeUsername(ev.target.value)}
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
                          value={password}
                          onChange={(ev) => changePassword(ev.target.value)}
                        />
                        <label className="form-label" htmlFor="typePassword">
                          Salasana
                        </label>
                        <input
                          type="password"
                          id="typePasswordAgain"
                          className="form-control form-control-lg"
                          value={repeatPassword}
                          onChange={(ev) => changeRepeatPassword(ev.target.value)}
                        />
                        <label className="form-label" htmlFor="typePasswordAgain">
                          Salasana uudestaan
                        </label>
                      </div>
                      <button type="submit" id="submitRegister" className="btn btn-outline-light btn-lg px-5">
                        Rekisteröidy
                      </button>
                    </form>
                  </div>
                  <div>
                    <p className="mb-0">
                      <a href="#!" className="text-white-50 fw-bold" onClick={() => navigate("/")}>
                        Etusivulle
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
