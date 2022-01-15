import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ax from "../../ax";
import AuthContext from "../../context/AuthContext";
import MessageContext from "../../context/MessageContext";
import Master from "../Layout/Master";

export default function Register() {
  const message = useContext(MessageContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      message.setMessage({ type: "error", message: "You Already Login!" });
      history.push("/");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);

  //context
  const authUserContext = React.useContext(AuthContext);
  const msgContext = React.useContext(MessageContext);
  const history = useHistory();

  const login = () => {
    setLoader(true);
    var frmData = new FormData();
    frmData.append("name", name);
    frmData.append("email", email);
    frmData.append("password", password);
    ax.post("/register", frmData, { headers: { Authorization: "some" } }).then(
      (res) => {
        setLoader(false);
        const { success, data } = res.data;
        if (success == false) {
          setError(data);
        } else {
          //successs
          //local storage set item
          localStorage.setItem("token", data.token);
          //set auth user to context
          authUserContext.setAuthUser(data.user);

          //toast
          msgContext.setMessage({
            type: "success",
            message: `Welcome ${data.user.name}`,
          });

          //redirect
          history.push("/");
        }
      }
    );
  };
  return (
    <Master>
      <div className="container mt-3">
        <div className="row">
          {/* For Category and Information */}

          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-header bg-dark">
                <h3 className="text-white">Register</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor className="text-white">
                    Enter Username
                  </label>
                  <input
                    type="text"
                    className={`form-control bg-dark  text-white ${
                      error.name && "border border-danger"
                    }`}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="enter your name"
                  />
                  {error.name &&
                    error.name.map((er, index) => (
                      <small key={index} className="text text-danger">
                        {er}
                      </small>
                    ))}
                </div>
                <div className="form-group">
                  <label htmlFor className="text-white">
                    Enter Email
                  </label>
                  <input
                    type="email"
                    className={`form-control bg-dark  text-white ${
                      error.email && "border border-danger"
                    }`}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email"
                  />
                  {error.email &&
                    error.email.map((er, index) => (
                      <small key={index} className="text text-danger">
                        {er}
                      </small>
                    ))}
                </div>
                <div className="form-group">
                  <label htmlFor className="text-white">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    className={`form-control bg-dark  text-white ${
                      error.password && "border border-danger"
                    }`}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*****"
                  />
                  {error.password &&
                    error.password.map((er, index) => (
                      <small key={index} className="text text-danger">
                        {er}
                      </small>
                    ))}
                </div>
                <button
                  disabled={loader}
                  type="submit"
                  defaultValue="Register"
                  className="btn btn-dark"
                  onClick={() => login()}
                  value="register"
                >
                  {loader && (
                    <>
                      <span
                        className="spinner-border spinner-border-sm mb-1"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Loading...</span>
                    </>
                  )}
                  &nbsp; Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}
