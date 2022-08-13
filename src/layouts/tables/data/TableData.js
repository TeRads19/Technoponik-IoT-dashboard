/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { ref, onValue, getDatabase, get, DataSnapshot, limitToFirst, onChildAdded, orderByKey,query, onChildChanged } from "firebase/database";

// Images
import team2 from "assets/images/team-2.jpg";
//import team3 from "assets/images/team-3.jpg";
//import team4 from "assets/images/team-4.jpg";
import Tanggalan from "./tanggal";
import { useState } from "react";




export default function TableData() {
const {tabledat, waktu, status, tanggal} = useState();

  const Author = ({ image, isian}) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={isian} size="sm" />
      <MDBox ml={3} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {isian}
        </MDTypography>
        <MDTypography variant="caption">Data Tingkat keasaman</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Waktu = ({ jam }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {jam}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "data", accessor: "data", align: "left" },
      { Header: "waktu", accessor: "waktu", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "tanggal", accessor: "employed", align: "center" },
    ],

    rows: [
      {
        author: <Author image={team2} isian={tabledat} />,
        function: <Waktu jam={waktu}/>,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={status} color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <Tanggalan/>
          </MDTypography>
        ),

      },
    ],
  };
}
