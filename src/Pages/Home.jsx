import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import ax from "../ax";
import Label from "../Components/Label";
import Spinner from "../Components/Spinner";

import MessageContext from "../context/MessageContext";
import Master from "./Layout/Master";

export default function Home() {
  //state
  const [note, setNote] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [pageLoader, setPageLoader] = useState(true);
  const [loaderMoreLoader, setLoadMoreLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const [contributeLoader, setContributeLoader] = useState(true);
  const [contributeNote, setContributeNote] = useState([]);
  const [receiveLoader, setReceiveLoader] = useState(true);
  const [receiveNote, setReceiveNote] = useState([]);
  //context
  const message = useContext(MessageContext);
  const history = useHistory();
  const { category_slug } = useParams();
  console.log(category_slug);
  useEffect(() => {
    setPageLoader(true);
    setContributeLoader(true);
    setReceiveLoader(true);
    if (!localStorage.getItem("token")) {
      message.setMessage({ type: "error", message: "Please Login First" });
      history.push("/login");
    }

    //get all note
    const token = localStorage.getItem("token");
    var url = "/note";
    if (category_slug) {
      url += "?category_slug=" + category_slug;
    }
    ax.get(url, { headers: { Authorization: `Bearer ${token}` } }).then(
      ({ data }) => {
        setNote(data.data.data);
        setNextPage(data.data.next_page_url);
        setPageLoader(false);
      }
    );

    //get contribute
    ax.get("/contribute-note/get", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setContributeLoader(false);
      setContributeNote(data.data.data);
    });

    //get receive note
    ax.get("/receive-note/get", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setReceiveLoader(false);
      setReceiveNote(data.data.data);
    });
  }, [category_slug]);

  const renderNextPage = () => {
    setLoadMoreLoader(true);
    const token = localStorage.getItem("token");
    ax.get(nextPage, { headers: { Authorization: `Bearer ${token}` } }).then(
      ({ data }) => {
        setNote([...note, ...data.data.data]);
        setNextPage(data.data.next_page_url);
        setLoadMoreLoader(false);
      }
    );
  };
  const deleteNote = (slug) => {
    setDeleteLoader(slug);
    var frmData = new FormData();
    frmData.append("_method", "DELETE");
    const token = localStorage.getItem("token");
    ax.post(`/note/${slug}`, frmData, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setDeleteLoader(false);
      if (data.success) {
        setNote(note.filter((d) => d.slug !== slug));
        message.setMessage({ type: "success", message: "Note Deleted" });
      }
    });
  };
  return (
    <Master>
      <div className="container mt-3">
        <div className="row">
          {/* For Category and Information */}
          <div className="col-md-4">
            <Label />
            <div className="card bg-gray-100">
              <div className="card-body">
                <li className="list-group-item bg-bg text-white">
                  Contribute Notes
                  <Link
                    to={"/show/contribute"}
                    className="badge badge-dark  text-white float-right"
                  >
                    All
                  </Link>
                </li>
                {contributeLoader ? (
                  <Spinner />
                ) : (
                  <ul className="list-group label">
                    {contributeNote &&
                      contributeNote.map((d) => (
                        <li className="list-group-item bg-dark text-white">
                          You Share{" "}
                          <Link to={`/note/${d.note.slug}`}>
                            {d.note.title} Note
                          </Link>{" "}
                          to <b>{d.receive_user.name}</b>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Recive */}
            <div className="card bg-gray-100">
              <div className="card-body">
                <li className="list-group-item bg-bg text-white">
                  Receive Notes
                  <Link
                    to={"/show/receive"}
                    className="badge badge-dark  text-white float-right"
                  >
                    All
                  </Link>
                </li>
                {receiveLoader ? (
                  <Spinner />
                ) : (
                  <ul className="list-group label">
                    {receiveNote &&
                      receiveNote.map((d) => (
                        <li className="list-group-item bg-dark text-white">
                          You Receive
                          <Link to={`/note/${d.note.slug}`}>
                            {" "}
                            {d.note.title}{" "}
                          </Link>
                          From
                          <b className="text-primary">
                            {" "}
                            {d.contribute_user.name}
                          </b>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <Link to="/note/create" className="btn btn-sm btn-danger mb-3">
                  Create New
                </Link>
                {pageLoader && <Spinner />}
                {!pageLoader && (
                  <div className="row">
                    {/* Loop Note */}
                    {note.map((d) => (
                      <div className="col-md-4" key={d.id}>
                        <div className="card">
                          <Link to={`/note/${d.slug}`}>
                            <div
                              className="card-header"
                              style={{ backgroundColor: d.color }}
                            >
                              <h5 className="text-white">{d.title}</h5>
                            </div>
                          </Link>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-4 text-center">
                                <Link
                                  to={`/note/${d.slug}`}
                                  className="badge badge-primary"
                                >
                                  <i className="fas fa-eye" />
                                </Link>
                              </div>

                              <div className="col-md-4 text-center">
                                <Link
                                  to={`/contribute/${d.slug}`}
                                  className="badge badge-warning"
                                >
                                  <i className="fas fa-share" />
                                </Link>
                              </div>
                              <div className="col-md-4 text-center">
                                <span
                                  onClick={() => deleteNote(d.slug)}
                                  className="badge badge-warning"
                                >
                                  {deleteLoader === d.slug ? (
                                    <Spinner />
                                  ) : (
                                    <i className="fas fa-trash" />
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* For Load */}
                <div className="row">
                  <div className="col-md-12 text-center">
                    <button
                      className="btn btn-primary btn-fab btn-icon btn-round"
                      onClick={renderNextPage}
                      disabled={nextPage === null ? true : false}
                    >
                      {loaderMoreLoader ? (
                        <Spinner />
                      ) : (
                        <i className="fas fa-arrow-down" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}
