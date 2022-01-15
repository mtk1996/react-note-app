import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ax from "../../ax";
import Spinner from "../../Components/Spinner";
import Master from "../Layout/Master";
import MessageContext from "../../context/MessageContext";

function Edit() {
  const location = useLocation();
  const [label, setLabel] = useState(location.state.label.name);
  const [updateLoader, setUpdateLoader] = useState(false);

  //context
  const { setMessage } = useContext(MessageContext);
  const update = () => {
    setUpdateLoader(true);
    const token = localStorage.getItem("token");
    const frmData = new FormData();
    frmData.append("name", label);
    frmData.append("_method", "PUT");
    ax.post("/category/" + location.state.label.slug, frmData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setUpdateLoader(false);
      if (data.success) {
        setMessage({ type: "success", message: "Label Updated Success" });
      }
    });
  };
  return (
    <Master>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card p-2 mt-2">
              <div>
                <Link to="/label" className="btn btn-sm btn-danger mb-4">
                  View All Label
                </Link>
              </div>

              <div className="form-group">
                <label>Enter Label</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setLabel(e.target.value)}
                  value={label}
                />
              </div>
              <div>
                <button
                  onClick={update}
                  className="btn btn-sm btn-danger"
                  disabled={updateLoader}
                >
                  {updateLoader ? <Spinner /> : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}

export default Edit;
