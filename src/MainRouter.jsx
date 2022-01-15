import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home";
import All from "./Pages/Label/All";
import Create from "./Pages/Note/Create";
import Edit from "./Pages/Note/Edit";
import EditLabel from "./Pages/Label/Edit";
import CreateLabel from "./Pages/Label/Create";
import SearchUser from "./Pages/Contribute/SearchUser";
import ShowAll from "./Pages/Contribute/ShowAll";

const MainRouter = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/:category_slug/note" exact>
        <Home />
      </Route>
      <Route path="/note/create" exact>
        <Create />
      </Route>
      <Route path="/note/:slug" exact>
        <Edit />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>

      {/* Label */}
      <Route path="/label" exact>
        <All />
      </Route>
      <Route path="/label/create" exact>
        <CreateLabel />
      </Route>
      <Route path="/label/edit/:slug" exact>
        <EditLabel />
      </Route>

      {/* Contribute */}
      <Route path="/contribute/:slug" exact>
        <SearchUser />
      </Route>
      <Route path="/show/contribute/" exact>
        <ShowAll />
      </Route>
      <Route path="/show/receive/" exact>
        <ShowAll />
      </Route>
    </Switch>
  );
};
export default MainRouter;
