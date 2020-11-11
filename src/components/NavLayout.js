import React from "react";
import { Link } from "react-router-dom";

export function NavLayout({ children }) {
  return (
    <>
      <nav>
        <ul className="flex justify-end">
          <li className="flex mx-4">
            <Link to="/" className="no-underline">
              Home
            </Link>
          </li>
          <li className="flex mx-4">
            <Link to="/people" className="no-underline">
              People
            </Link>
          </li>
          <li className="flex mx-4">
            <Link to="/projects" className="no-underline">
              Projects
            </Link>
          </li>
          <li className="flex mx-4">
            <Link to="/opportunities" className="no-underline">
              Opportunities
            </Link>
          </li>
          <li className="flex mx-4">
            <Link to="/logout" className="no-underline">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}
