import React from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav class="navbar border-bottom   shadow ">
        <div class="container p-2">
          <span class="navbar-brand mb-0 h1"><BiSolidUserDetail/>UserDetails</span>
          <Link to={'/add'} className="btn btn-outline-primary">Add New User</Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
