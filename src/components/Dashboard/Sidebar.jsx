import React from "react";

import { Link } from "react-router-dom";

 

const Sidebar = () => {

  return (

    <div className="w-64 h-screen bg-black hover:text-white">

      <div className="container1 text-center pt-10">

        <h1 className=" text-2xl font-bold font-poppins text-blue-500 hover:cursor-pointer">

          DeLand

        </h1>

      </div>

      <div className="container-2 mt-10">

        <ul className="space-y-2 text-center">

          <li>

            <Link

              to="/dashboard/"

              className="block px-4 py-2  text-white  hover:bg-gray-700 "

            >

              Home

            </Link>

          </li>

          <li>

            <Link

              to="/dashboard/view"

              className="sidebar-link block   text-white px-4 py-2 hover:bg-gray-700"

            >

              View Listings

            </Link>

          </li>

          <li>

            <Link

              to="/dashboard/explore"

              className="sidebar-link block   text-white px-4 py-2 hover:bg-gray-700"

            >

              Explore

            </Link>

          </li>

          <li>

            <Link

              to="/dashboard/upload"

              className="sidebar-link block  text-white px-4 py-2 hover:bg-gray-700"

            >

              Upload

            </Link>

          </li>

          <li>

            <Link

              to="/dashboard/requests"

              className="sidebar-link block  text-white px-4 py-2 hover:bg-gray-700"

            >

              Requests

            </Link>

          </li>
          <li>

            <Link

              to="/dashboard/requested"

              className="sidebar-link block  text-white px-4 py-2 hover:bg-gray-700"

            >

              Requested

            </Link>

          </li>
          <li>

            <Link

              to="/dashboard/"

              className="sidebar-link block  text-white px-4 py-2 hover:bg-gray-700"

            >

              Disconnect

            </Link>

          </li>

        </ul>

      </div>

    </div>

  );

};

 

export default Sidebar