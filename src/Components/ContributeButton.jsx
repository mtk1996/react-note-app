import React from "react";
import { Link, useLocation } from "react-router-dom";

function ContributeButton() {
  const { pathname } = useLocation();
  return (
    <div>
      <Link
        to={"/show/contribute"}
        className={`${
          pathname === "/show/contribute"
            ? "btn-primary"
            : "btn-outline-primary"
        } btn btn-sm `}
      >
        Contribute
      </Link>
      <Link
        to={"/show/receive"}
        className={`${
          pathname === "/show/receive" ? "btn-primary" : "btn-outline-primary"
        } btn btn-sm `}
      >
        Receive
      </Link>
    </div>
  );
}

export default ContributeButton;
