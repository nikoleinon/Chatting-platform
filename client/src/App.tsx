import React, { useEffect, useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
