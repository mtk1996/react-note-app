import React from "react";
import { Link, useLocation } from "react-router-dom";
import ContributeButton from "../../Components/ContributeButton";
import Master from "../Layout/Master";

function ShowAll() {
  const { pathname } = useLocation();

  return (
    <Master>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card p-2">
              <ContributeButton />
              <ul className="list-group mt-3">
                <li className="list-group-item bg-dark text-white mt-1">
                  You Contribute <Link>Note</Link> Someone
                </li>
                <li className="list-group-item bg-dark text-white mt-1">
                  You Contribute <Link>From</Link> Someone
                </li>
                <li className="list-group-item bg-dark text-white mt-1">
                  You Contribute <Link>From</Link> Someone
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}

export default ShowAll;
