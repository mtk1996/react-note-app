import React, { useContext, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import ax from "../ax";
import LabelContext from "../context/LabelContext";
import Spinner from "./Spinner";

export default function Label() {
  const {
    loader,
    label,
    setSelectedLabel,
    selectedLabel,
    setLabel,
    setLoader,
  } = useContext(LabelContext);
  const { pathname } = useLocation();
  const { push } = useHistory();

  const token = localStorage.getItem("token");
  useEffect(() => {
    ax.get("/category", { headers: { Authorization: "Bearer " + token } }).then(
      (d) => {
        const { data } = d.data;
        setLabel(data.data);
        setLoader(false);
      }
    );
  });
  const renderAll = () => {
    setSelectedLabel(null);
    push("/");
  };
  return (
    <div className="card bg-gray-100">
      <div className="card-body">
        {loader && <Spinner />}

        {!loader && (
          <>
            <li className="list-group-item bg-bg text-white">
              Label
              <Link to="/label" className="btn btn-sm btn-dark float-right">
                Show All
              </Link>
            </li>

            <li
              className={`list-group-item  text-white ${
                pathname === "/" ? "bg-danger" : "bg-dark"
              } `}
              onClick={() => renderAll()}
            >
              <span className="fas fa-tags text-white text-small" />
              &nbsp; &nbsp; All
            </li>

            <ul className="list-group label">
              {label.map((d) => {
                return (
                  <Link key={d.id} to={`/${d.slug}/note`}>
                    <li
                      className={`list-group-item  text-white  ${
                        d.id == selectedLabel ? "bg-danger" : "bg-dark"
                      } `}
                      onClick={() => setSelectedLabel(d.id)}
                    >
                      <span className="fas fa-tags text-white text-small" />
                      &nbsp; &nbsp; {d.name}
                      <span className="badge badge-primary float-right">
                        {d.note_count}
                      </span>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
