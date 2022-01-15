import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ax from "../../ax";
import AuthContext from "../../context/AuthContext";
import LabelContext from "../../context/LabelContext";
import MessageContext from "../../context/MessageContext";
import Master from "../Layout/Master";

export default function Login() {
  const message = useContext(MessageContext);
  const { setLabel } = useContext(LabelContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      message.setMessage({ type: "error", message: "You Already Login!" });
      history.push("/");
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  //context
  //context
  const authUserContext = React.useContext(AuthContext);
  const msgContext = React.useContext(MessageContext);
  const history = useHistory();

  const Login = () => {
    setLoader(true);
    //server request
    const frmData = new FormData();
    frmData.append("email", email);
    frmData.append("password", password);
    ax.post("/login", frmData).then((d) => {
      const { token, user } = d.data.data;

      localStorage.setItem("token", token);
      //set auth user to context
      authUserContext.setAuthUser(user);

      //toast
      msgContext.setMessage({
        type: "success",
        message: `Welcome Back ${user.name}`,
      });

      ax.get("/category", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(({ data }) => {
        setLabel(data.data.data);
        history.push("/");
      });
      //redirect
    });
    //loc
  };
  return (
    <Master>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-header bg-dark">
                <h3 className="text-white">Login</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor className="text-white">
                    Enter Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control bg-dark border-0 text-white"
                    name="email"
                    placeholder="enter your email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor className="text-white">
                    Enter Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control bg-dark border-0 text-white"
                    name="password"
                    placeholder="*****"
                  />
                </div>
                <button
                  disabled={loader}
                  className="btn btn-dark"
                  onClick={() => Login()}
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
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}
