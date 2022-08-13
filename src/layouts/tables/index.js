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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useState, useEffect } from "react";
import { db } from "sensordata/configfb";
import { ref, onValue, getDatabase, get, DataSnapshot, limitToFirst, onChildAdded, orderByKey,query, onChildChanged, limitToLast } from "firebase/database";
import foodph from "assets/images/foodph.webp";
import doicon from "assets/images/DOVector.jpg";
import tdsicon from "assets/images/datatds.webp";
import tempicon from "assets/images/temp.png";
import addNotification from "react-push-notification";

const datasource = ref(db, 'Sensordat');
var que = query(datasource,limitToLast(288));


var dataTabeldo = [];
var dataTabelPH = [];
var dataTabelTDS =[];
var tempdat =[];
var dataTabeltemp =[];

var phdat =[];
var dodat =[];
var tdsdat =[];
var waktudat =[];
var tgldat =[];








function Tables() {

  const [dataPH, setDataPH] = useState([]);

  const coltab = [
    { Header: "data", accessor: "data", align: "left" },
    { Header: "waktu", accessor: "waktu", align: "left" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "tanggal", accessor: "tanggal", align: "center" },
  ];

  const Thistabdat = ({ image, inidata, skalar }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={inidata} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {inidata} {skalar}
        </MDTypography>
        <MDTypography variant="caption">Nilai Galat data sebesar 5%</MDTypography>
      </MDBox>
    </MDBox>
  );
  //const { columns: pColumns, rows: pRows } = projectsTableData(); // instansiasi data dari projecttabledata ke variabel pColumns dan pRows

  const insertdatado = async () => {
    var buffdat =[];
    var times = 0;
    dodat.map((arrval, index) =>
    {
      
      const skala ="PPM";
      var stat = "";
      var warna ="";

      if(arrval > 10 || arrval < 4.5 ){
        stat = "Danger"
        warna = "error"
      }

      else {        
      stat = "Aman"
      warna = "success"
      }

      buffdat.push({
        data: (
        <Thistabdat image ={doicon} inidata={arrval} skalar={skala}/>
        ),
        waktu: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {waktudat[times]}
        </MDTypography>
        ),
        status:  (
          <MDBox ml={-1}>
            <MDBadge badgeContent={stat} color={warna} variant="gradient" size="sm" />
          </MDBox>
        ),
        tanggal: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {tgldat[times]}
          </MDTypography>
        ),
        });
        times ++;
    }
    );
    dataTabeldo = buffdat;
  }

  const insertdataph = async () => {
    var buffdat =[];
    var times = 0;
    phdat.map((arrval, index) =>
    {
      
      var stat = "";
      var warna ="";

      if(arrval > 8 || arrval < 6.9 ){
        stat = "Danger"
        warna = "error"
      }

      else {        
      stat = "Aman"
      warna = "success"
      }

      buffdat.push({
        data: (
        <Thistabdat image ={foodph} inidata={arrval} skalar="" />
        ),
        waktu: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {waktudat[times]}
        </MDTypography>
        ),
        status:  (
          <MDBox ml={-1}>
            <MDBadge badgeContent={stat} color={warna} variant="gradient" size="sm" />
          </MDBox>
        ),
        tanggal: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {tgldat[times]}
          </MDTypography>
        ),
        });
        times ++;
    }
    );
    dataTabelPH = buffdat;
  }                       
  
  const insertdatatds = async () => {
    var buffdat =[];
    var times = 0;
    tdsdat.map((arrval, index) =>
    {
      
      var stat = "";
      var warna ="";

      if(arrval > 800){
        stat = "Danger"
        warna = "error"
      }

      else {        
      stat = "Aman"
      warna = "success"
      }

      buffdat.push({
        data: (
        <Thistabdat image ={tdsicon} inidata={arrval} skalar ="PPM"/>
        ),
        waktu: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {waktudat[times]}
        </MDTypography>
        ),
        status:  (
          <MDBox ml={-1}>
            <MDBadge badgeContent={stat} color={warna} variant="gradient" size="sm" />
          </MDBox>
        ),
        tanggal: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {tgldat[times]}
          </MDTypography>
        ),
        });
        times ++;
    }
    );
    dataTabelTDS = buffdat;
  }

  const insertdatatemp = async () => {
    var buffdat =[];
    var times = 0;
    tempdat.map((arrval, index) =>
    {
      
      var stat = "";
      var warna ="";

      if(arrval > 29 || arrval < 20){
        stat = "Danger"
        warna = "error"
      }

      else {        
      stat = "Aman"
      warna = "success"
      }

      buffdat.push({
        data: (
        <Thistabdat image ={tempicon} inidata={arrval} skalar = {"\u00b0C"}/>
        ),
        waktu: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {waktudat[times]}
        </MDTypography>
        ),
        status:  (
          <MDBox ml={-1}>
            <MDBadge badgeContent={stat} color={warna} variant="gradient" size="sm" />
          </MDBox>
        ),
        tanggal: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {tgldat[times]}
          </MDTypography>
        ),
        });
        times ++;
    }
    );
    dataTabeltemp = buffdat;
  }

  const notifMe = () => {
    if (dodat[0] >= 10 || dodat[0] < 5){
      var pesan = 'DO saat ini = ' + dodat[0]  + " PPM";
      addNotification({
        title: "Warning !",
        subtitle: "DO Dalam Level Bahaya",
        message: pesan,
        theme: "red",
        duration: 7000,
        native: true // when using native, your OS will handle theming.
      });
    }
    else if (phdat[0] > 8 || phdat[0] < 6.5){
      var pesan = 'PH saat ini = ' + phdat[0];
      addNotification({
        title: "Warning !",
        subtitle: "PH Dalam Level Bahaya",
        message: pesan,
        theme: "red",
        duration: 7000,
        native: true // when using native, your OS will handle theming.
      });
    }
    else if (tempdat[0] > 30 || tempdat[0] < 25){
      var pesan = "PH saat ini = " + tempdat[0] + "\u00b0 C";
      addNotification({
        title: "Warning !",
        subtitle: "PH Dalam Level Bahaya",
        message: pesan,
        theme: "red",
        duration: 7000,
        native: true // when using native, your OS will handle theming.
      });
    }
    else if (tdsdat[0] > 800){
      var pesan = 'TDS saat ini = ' + tdsdat[0];
      addNotification({
        title: "Warning !",
        subtitle: "TDS Dalam Level Bahaya",
        message: pesan,
        theme: "red",
        duration: 7000,
        native: true // when using native, your OS will handle theming.
      });
    }  
  }
  
  useEffect(() =>{
    onValue(que,(snapshot) =>
    {
    const buffArr = [];
    Object.keys(snapshot.val()).map(key =>{
    buffArr.push({
      id: key,
      data: snapshot.val()[key]
    })})
    
    setDataPH(buffArr.map((arrVal, index) => {
      return (arrVal.data.PH);
      }),
      dodat = buffArr.map((arrVal, index)=> {
        return (arrVal.data.DO);
      }), dodat=dodat.reverse(),
      phdat = buffArr.map((arrVal, index)=> {
        return (arrVal.data.PH);
      }), phdat=phdat.reverse(),
      tdsdat = buffArr.map((arrVal, index)=> {
        return (arrVal.data.TDS);
      }), tdsdat=tdsdat.reverse(),
      tempdat = buffArr.map((arrVal, index)=> {
        return (arrVal.data.Suhu);
      }),tempdat=tempdat.reverse(),
      waktudat = buffArr.map((arrVal, index)=> {
        return (arrVal.data.Time);
      }), waktudat=waktudat.reverse(),
      tgldat = buffArr.map((arrVal, index)=> {
        return (arrVal.data.Tanggal);
      }),tgldat=tgldat.reverse(),
        
        insertdatado(),
        insertdataph(),
        insertdatatds(),
        insertdatatemp(),
        notifMe(),
        );
    });
  },[]);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {/* xs untuk mengatur lebar kotak Tabel */}
            <Card>
              {/* ini untuk mengatur box header */}
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Tabel Dissolved Oxygen
                </MDTypography>
              </MDBox>
              {/* kotak tabel berisi data */}
              <MDBox pt={3}>
                <DataTable
                  table={{columns: coltab, rows: dataTabeldo}}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

          {/* ini untuk table lain */}
          <Grid item xs={12}>
            {/* xs untuk mengatur lebar kotak Tabel */}
            <Card>
              {/* ini untuk mengatur box header */}
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Tabel pH
                </MDTypography>
              </MDBox>
              {/* kotak tabel berisi data */}
              <MDBox pt={3}>
                <DataTable
                  table={{columns: coltab, rows: dataTabelPH}}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          {/* ini untuk table lain */}
          <Grid item xs={12}>
            {/* xs untuk mengatur lebar kotak Tabel */}
            <Card>
              {/* ini untuk mengatur box header */}
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Tabel Total Dissolved Solid
                </MDTypography>
              </MDBox>
              {/* kotak tabel berisi data */}
              <MDBox pt={3}>
                <DataTable
                  table={{columns: coltab, rows: dataTabelTDS}}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

          {/* ini untuk table lain */}
          <Grid item xs={12}>
            {/* xs untuk mengatur lebar kotak Tabel */}
            <Card>
              {/* ini untuk mengatur box header */}
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Tabel Temperatur Air
                </MDTypography>
              </MDBox>
              {/* kotak tabel berisi data */}
              <MDBox pt={3}>
                <DataTable
                  table={{columns: coltab, rows: dataTabeltemp}}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
