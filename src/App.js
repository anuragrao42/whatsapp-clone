import React from "react";
import Sidebar from "./Sidebar";
import "./App.css";
import Chat from "./Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import { useStateProviderValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateProviderValue();

  return (
    //Bem naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
