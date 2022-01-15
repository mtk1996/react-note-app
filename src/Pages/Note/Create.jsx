import React, { useContext, useState } from "react";
import Master from "../Layout/Master";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LabelContext from "../../context/LabelContext";
import MessageContext from "../../context/MessageContext";
import ax from "../../ax";
import Spinner from "../../Components/Spinner";
function Create() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);

  //context
  const { label } = useContext(LabelContext);
  const { setMessage } = useContext(MessageContext);

  const storeNote = () => {
    setLoader(true);
    const frmData = new FormData();
    frmData.append("title", title);
    frmData.append("description", description);
    frmData.append("category_slug", category);
    frmData.append("color", color);
    const token = localStorage.getItem("token");
    ax.post("/note", frmData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setLoader(false);
      if (data.success === false) {
        setMessage({ type: "error", message: "Please Enter All Field!" });
        setError(data.data);
        return;
      }
      if (data.success === true) {
        setMessage({ type: "success", message: "Note Created Success!" });
        return;
      }
    });
  };
  return (
    <Master>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div
              className="card-header"
              style={{ backgroundColor: color ? color : "#212529" }}
            >
              Create New Note
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="">Enter Title</label>
                <input
                  type="text"
                  className={`form-control ${
                    error.title && "border border-danger"
                  }`}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {error.title &&
                  error.title.map((d) => (
                    <small key={d} className="text text-danger">
                      {d}
                    </small>
                  ))}
              </div>
              <div className="form-group">
                <label htmlFor="">Choose Label</label>
                <select
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">--Select Label--</option>
                  {label.map((d) => (
                    <option key={d.id} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Choose Color</label>

                <select
                  className="form-control"
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">--Select Color--</option>
                  <option value="#dc3545">Red</option>
                  <option value="#20c997">Green</option>
                  <option value="#007bff">Blue</option>
                  <option value="#ffc107">Yellow</option>
                  <option value="#fd7e14">Orange</option>
                </select>
              </div>
              <div className="gorm-group">
                <label htmlFor="">Enter Description</label>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                />
              </div>

              <button
                onClick={() => storeNote()}
                className="btn  btn-danger"
                disabled={loader}
              >
                {loader && <Spinner />}
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}

export default Create;
