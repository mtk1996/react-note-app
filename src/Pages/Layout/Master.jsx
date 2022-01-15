import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LabelContext from "../../context/LabelContext";

export default function Master(props) {
  //context
  const authUser = useContext(AuthContext);
  const { setSelectedLabel } = useContext(LabelContext);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    authUser.setAuthUser({});
    history.push("/login");
  };
  const renderHome = () => {
    setSelectedLabel("");
    history.push("/");
  };
  return (
    <>
      <div>
        {/* Header */}
        <div className="container-fluid" id="header">
          <div />
          <nav className="navbar navbar-expand-lg">
            <div className="container">
              <span className="navbar-brand text-white" onClick={renderHome}>
                MMC-Note
              </span>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">
                      Home{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Your Order
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link disabled"
                      href="#"
                      tabIndex={-1}
                      aria-disabled="true"
                    >
                      Cart
                      <small className="badge badge-danger">7</small>
                    </a>
                  </li>
                </ul>
                <div className="form-inline mr-5">
                  <div className="dropdown">
                    <span
                      id="option"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="btn btn-lg bg-dark text-white btn-rounded"
                    >
                      <i className="fas fa-cog" />
                    </span>
                    <br />
                    <div
                      className="dropdown-menu text-center bg-dark"
                      aria-labelledby="option"
                    >
                      <span className="fa fa-user text-white" />
                      <br />
                      <span className="fas fa-tags text-white mt-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <h1 className="text-white">Welcome From MM-Coder Note</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Praesentium sequi voluptas similique sed minima rerum labore
                  reprehenderit, illo recusandae quasi tempore placeat aliquam
                  autem, a soluta nisi totam temporibus dolorem!
                </p>
                {localStorage.getItem("token") ? (
                  <button onClick={() => logout()} className="btn btn-danger">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-outline-primary">
                      SignUp
                    </Link>
                    <Link to="/login" className="btn btn-primary">
                      Login
                    </Link>
                  </>
                )}
              </div>
              <div className="col-md-6 text-center">
                <img
                  className
                  src="https://wp.xpeedstudio.com/seocify/home-fifteen/wp-content/uploads/sites/27/2020/03/home17-banner-image-min.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* End Header */}
        {props.children}
      </div>
    </>
  );
}
