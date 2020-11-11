import React from "react";
import { Link } from "react-router-dom";
import { IconLogout } from "tabler-icons";

export function NavLayout({ children }) {
  return (
    <>
      <nav>
        <ul className="flex justify-end items-center">
          <li className="flex mx-4">
            <Link to="/" className="no-underline navItem">
              Home
            </Link>
          </li>
          <li className="flex mx-4">
            <Link to="/people" className="no-underline navItem">
              People
            </Link>
          </li>
          <li className="flex mx-4">
            <Link to="/projects" className="no-underline navItem">
              Projects
            </Link>
          </li>
          <li className="flex mx-4">
            <Link to="/opportunities" className="no-underline navItem">
              Opportunities
            </Link>
          </li>
          <li className="flex mx-4">
            <Link to="/logout" className="no-underline navItem flex items-center">
              <IconLogout className="mr-2" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}
