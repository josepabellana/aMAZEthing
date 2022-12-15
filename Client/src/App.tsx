import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Auth0ProviderWithHistory from "./components/auth0Provider";
import Navbar from "./components/navbar";
import './assets/font-fam/Staatliches-Regular.ttf'

function App(props: any) {

  if (localStorage.getItem('path') === null) window.localStorage.setItem('path', JSON.stringify([]));
  if (localStorage.getItem('sorting') === null) window.localStorage.setItem('sorting', JSON.stringify([]));


  return (
      <Auth0ProviderWithHistory>
        <div className="fullContainer">
          <Navbar />
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </Auth0ProviderWithHistory>
  );
}

export default App;
