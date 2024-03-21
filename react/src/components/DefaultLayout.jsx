import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
  const { user, token } = useStateContext();
  if (!token) {
    return <Navigate to="/login"></Navigate>;
  }
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/users">Users</Link>
        <Link to="/dashboard">Dashboard</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div>User info</div>
        </header>
      </div>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
