import React, { useContext, useEffect, useState } from "react";
import Master from "../Layout/Master";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LabelContext from "../../context/LabelContext";
import MessageContext from "../../context/MessageContext";
import ax from "../../ax";
import Spinner from "../../Components/Spinner";
import { useParams } from "react-router-dom";
function Edit() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);

  //context
  const { label } = useContext(LabelContext);
  const { setMessage } = useContext(MessageContext);
  const { slug } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");
    ax.get("/note/" + slug, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      console.log(data);
      setDescription(data.data.description);
      setTitle(data.data.title);
      setCategory(data.data.category.slug);
      setColor(data.data.color);
      setPageLoader(false);
    });
    return true;
  }, []);
  const updateNote = () => {
    setLoader(true);
    const frmData = new FormData();
    frmData.append("title", title);
    frmData.append("description", description);
    frmData.append("category_slug", category);
    frmData.append("color", color);
    frmData.append("_method", "PUT");
    const token = localStorage.getItem("token");
    ax.post("/note/" + slug, frmData, {
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
          {pageLoader ? (
            <Spinner />
          ) : (
            <div className="card">
              <div
                className="card-header text-white"
                style={{ backgroundColor: color ? color : "#212529" }}
              >
                Edit Note
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
                    value={title}
                  />
                  {error.title &&
                    error.title.map((index, d) => (
                      <small key={index} className="text text-danger">
                        {d}
                      </small>
                    ))}
                </div>
                <div className="form-group">
                  <label htmlFor="">Choose Label</label>
                  <select
                    value={category}
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
                    value={color}
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
                  onClick={() => updateNote()}
                  className="btn  btn-danger"
                  disabled={loader}
                >
                  {loader && <Spinner />}
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Master>
  );
}

export default Edit;
