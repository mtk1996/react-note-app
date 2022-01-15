import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ax from "../../ax";
import Spinner from "../../Components/Spinner";
import MessageContext from "../../context/MessageContext";
import Master from "../Layout/Master";
function SearchUser() {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [foundUser, setFoundUser] = useState(false); //{}
  const token = localStorage.getItem("token");

  //context
  const { setMessage } = useContext(MessageContext);
  const { slug } = useParams();
  const findUser = () => {
    setLoader(true);
    ax.post(
      "/search/user",
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(({ data }) => {
      if (data.success) {
        setLoader(false);
        setFoundUser(data.data);
        setMessage({ type: "success", message: "Email Found" });
      } else {
        setLoader(false);
        setFoundUser(false);
        setMessage({ type: "error", message: "Email Not Found" });
      }
    });
  };
  const contribute = () => {
    setLoader(true);
    ax.post(
      "/contribute-note/create",
      { note_slug: slug, user_email: foundUser.email },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(({ data }) => {
      setLoader(false);
      if (data.data === "already_contribute") {
        setFoundUser(false);
        setMessage({ type: "error", message: "Already Contribute That Note!" });
      }
      if (data.success) {
        setFoundUser(false);
        setMessage({ type: "success", message: "Contributed!" });
      }
    });
  };
  return (
    <Master>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {loader ? (
              <Spinner />
            ) : (
              <div className="card">
                <div className="card-header">Contribute Form</div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="">Enter Email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <button onClick={findUser} className="btn btn-danger">
                    Search
                  </button>
                </div>

                {foundUser && (
                  <div>
                    <hr />
                    <div className="card bg-danger text-center p-3">
                      <h1>{foundUser.name} Found!</h1>
                      <button onClick={contribute} className="btn btn-primary">
                        Contribute
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Master>
  );
}

export default SearchUser;
