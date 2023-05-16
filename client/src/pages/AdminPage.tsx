import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/NavigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  role: string;
}

export function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  let navigate = useNavigate();

  async function getUsers() {
    const response = await axios.get<User[]>(
      "http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/users"
    );
    setUsers(response.data);
  }

  async function deleteUser(id: number) {
    await axios.delete(`http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  }
  async function promoteUser(id: number) {
    await axios.put(`http://fight-boredom-alb-1816382168.eu-north-1.elb.amazonaws.com:8080/users/${id}/role`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  const adminList = users
    .filter((user) => user.role === "admin")
    .map((user) => (
      <div
        key={user.id}
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        {user.username}
        <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>
          Delete
        </button>
      </div>
    ));

  const filteredUsers = users.filter((user) => user.role === "user" && user.username.includes(searchQuery));

  const userList = filteredUsers
    .filter((user) => user.role === "user")
    .map((user) => (
      <div
        key={user.id}
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        {user.username}
        <div>
          <button className="btn btn-sm btn-danger mr-1" onClick={() => deleteUser(user.id)}>
            Delete
          </button>
          <button className="btn btn-sm btn-primary" onClick={() => promoteUser(user.id)}>
            Promote
          </button>
        </div>
      </div>
    ));

  return (
    <div>
      <header>
        <NavigationBar />
      </header>
      <div className="container">
        {/* <h2 style={{ color: "white" }}>Tervetuloa</h2> */}
        <div className="row pt-3">
          <div className="col">
            <div className="list-group">
              <h4 style={{ color: "white" }}>Admins</h4>
              {adminList}
            </div>
          </div>
          <div className="col">
            <div className="list-group">
              <h4 style={{ color: "white" }}>Users</h4>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">
                    Search
                  </button>
                </div>
              </div>
              {userList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
