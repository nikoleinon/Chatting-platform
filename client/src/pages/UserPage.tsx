import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/NavigationBar";
import axios from "axios";
import "./UserPage.css";

export function UserPage() {
  const userName = sessionStorage.getItem("userName");
  const userId = sessionStorage.getItem("userId");

  return (
    <div>
      <header>
        <NavigationBar />
      </header>
      <div className="container">
        <h1 className="text-center my-2" style={{ color: "white" }}>
          Tervetuloa {userName}!
        </h1>

        <div className="d-flex flex-column mt-2">
          <div className="container-fluid py-1">
            <h2 className="font-weight-light p-1">Tallennetut tapahtumat</h2>
          </div>

          <div className="container-fluid py-1">
            <h2 className="font-weight-light">Omat ilmoitukset</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
