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

import MUIDataTable from "mui-datatables";

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
import { ref, onValue, getDatabase, get, DataSnapshot, limitToFirst, onChildAdded, orderByKey,query, onChildChanged, limitToLast, child } from "firebase/database";
import foodph from "assets/images/foodph.webp";
import doicon from "assets/images/DOVector.jpg";
import tdsicon from "assets/images/datatds.webp";
import tempicon from "assets/images/temp.png";
import addNotification from "react-push-notification";
import MDButton from "components/MDButton";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import data from "layouts/dasbor/components/Projects/data";

const muiCache = createCache({
	"key": "mui",
	"prepend": true
});




var dataTabeldo = [];
var dataTabelPH = [];
var dataTabelTDS =[];

var dataTabeltemp =[];

var month ="";
var tempdat =[];
var phdat =[];
var dodat =[];
var tdsdat =[];
var waktudat =[];
var tgldat =[];








function Tables() {
  const today = new Date();
  const getMuiTheme = () => createTheme({
    components: {
      MUIDataTableBodyCell: {
        styleOverrides:{
          root: {
              backgroundColor: "#FFFF",
              filterType: 'checkbox'
          }
        }
      }
    }
  })

  const [dataTab, setData] = useState([]);


  const thiscolumns = ["Data", "Company", "City", "State"];

const thisdata = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

  const coltab = [
    { Header: "data", accessor: "data", align: "left" },
    { Header: "waktu", accessor: "waktu", align: "left" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "tanggal", accessor: "tanggal", align: "center" },
  ];
  const options = {
    filterType: 'checkbox',
  };
  const rowmdatatable = [ 
    {
    name: "data",
    label: "Data",
    options: {
     filter: true,
     sort: true,
      }
    },
    {
      name: "waktu",
      label: "Waktu",
      options: {
      filter: true,
      sort: true,
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
      filter: true,
      sort: true,
        }
    },
    {
      name: "tanggal",
      label: "Tanggal",
      options: {
       filter: true,
       sort: true,
        }
      },

  ]

  /*
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
  );*/

  //const { columns: pColumns, rows: pRows } = projectsTableData(); // instansiasi data dari projecttabledata ke variabel pColumns dan pRows

  const insertdatado = async () => {
    var buffdat =[];
    var times = 0;
    dodat.map((arrval, index) =>
    {
      
      const skala ="PPM";
      var stat = "";
      var warna ="";

      if(arrval < 3 )
      {
        stat = "Danger"

      }

      else if(arrval < 4 && arrval >= 3 )
      {
        stat = "Warning"
      }

      else if (arrval > 9) {        
        stat = "Oversature"
        
        }
  
      else {        
      stat = "Aman"
      }

      buffdat.push({
        /*
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
        ),*/

        data:arrval,
        waktu:waktudat[times],
        status: stat,
        tanggal:tgldat[times],
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

      if(arrval > 11 || arrval < 3 ){
        stat = "Danger"
        warna = "error"
      }

      else if(arrval >= 3 && arrval < 6.5)
      {
        stat = "Warning"
      }

      else {        
      stat = "Aman"
      warna = "success"
      }

      buffdat.push({
        /*
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
        times ++;*/
        
        data:arrval,
        waktu:waktudat[times],
        status: stat,
        tanggal:tgldat[times],
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
      else if(arrval > 500 && arrval<= 800)
      {
        stat = "Warning"
      }

      else {        
      stat = "Aman"
      warna = "success"
      }

      buffdat.push({
        /*
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
        */
        data:arrval,
        waktu:waktudat[times],
        status: stat,
        tanggal:tgldat[times],
      }
        );
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
        /*
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
        */
        data:arrval,
        waktu:waktudat[times],
        status: stat,
        tanggal:tgldat[times],
      }
        );
        times ++;
    }
    );
    dataTabeltemp = buffdat;
  }

  const notifMe = () => {
    if (dodat[0] < 3){
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
    else if (phdat[0] > 10 || phdat[0] < 3){
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
    else if (tempdat[0] > 30 || tempdat[0] < 20){
      var pesan = "Suhu saat ini = " + tempdat[0] + "\u00b0 C";
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
  },[]);  

    const getdat = (indexbulan)=>{
    console.log(indexbulan);
    var path = "Sensordat/" + indexbulan;

    //get di dalam useEffect agar setiap di call akan re-render
    get(query(ref(db, path))).then((snapshot) => {
      //array data buffer
      const buffArr = [];
      var deconst = [];
      console.log(snapshot.val());

      //for loop untuk crawl data setiap node(childSnapshot)
      for (let i = 1; i < 32; i++) {
        var jalan = "";
        if(i<10){
          jalan = "0" + i + "-" + indexbulan;
        }
        else{
          jalan =  i + "-" + indexbulan;
        }
        console.log(jalan);
        snapshot.child(jalan).forEach(childSnapshot => {
          buffArr.push({data: childSnapshot.val()});
        });
      } 
      
      console.log(buffArr);
      console.log(deconst);
      
      setData(buffArr.map((arrVal, index) => {
        return (arrVal.data.DO);
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
          
        /* ini untuk sorting data setiap bulan pakai fungsi indexOf() dan Some
        const array = [1, 2, 3, 4, 5]; */
        
          insertdatado(),
          insertdataph(),
          insertdatatds(),
          insertdatatemp(),
          notifMe(),
          ); 
          console.log(dataTab);});
        
     
    }

    const dataJan = (event) => {
      var indexbul = "01" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "01" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataFeb = (event) => {
      var indexbul = "02" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "02" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataMar = (event) => {
      var indexbul = "03" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "03" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataApr = (event) => {
      var indexbul = "04" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "04" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataMei = (event) => {
      var indexbul = "05" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "05" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataJun = (event) => {
      var indexbul = "06" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "06" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataJul = (event) => {
      var indexbul = "07" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "07" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataAgs = (event) => {
      var indexbul = "08" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "08" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataSep = (event) => {
      var indexbul = "09" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "09" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataOkt = (event) => {
      var indexbul = "10" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "10" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataNov = (event) => {
      var indexbul = "11" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "11" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };
    const dataDes = (event) => {
      var indexbul = "12" /*get month*/ + "-" + "2022" /*get year*/
      //var indexbul = "12" /*get month*/ + "-" + today.getFullYear() /*get year*/
      getdat(indexbul);
    };


  return (
    
    <DashboardLayout>
      <DashboardNavbar />
      
      <MDBox pt={6} pb={3}>
      
        <Grid container spacing={6}>
        <Grid container justifyContent="space-evenly" alignItems="flex-end" item xs={12} >
        <MDButton variant="contained" color="info"
        onClick={dataJan}>Januari</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataFeb}>Februari</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataMar}>Maret</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataApr}>April</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataMei}>Mei</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataJun}>Juni</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataJul}>Juli</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataAgs}>Agustus</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataSep}>September</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataOkt}>Oktober</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataNov}>November</MDButton>
        <MDButton variant="contained" color="info"
        onClick={dataDes}>Desember</MDButton>
        </Grid>
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
                {/*
                <DataTable
                  table={{columns: coltab, rows: dataTabeldo}}
                  isSorted={true}
                  canSearch={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />*/}
                <ThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                      title={""}
                      data={dataTabeldo}
                      columns={rowmdatatable}
                    />
                    </ThemeProvider>
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
                {/*
                <DataTable
                  table={{columns: coltab, rows: dataTabelPH}}
                  isSorted={true}
                  canSearch={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                  />*/}
                <ThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                      title={""}
                      data={dataTabelPH}
                      columns={rowmdatatable}
                    />
                    </ThemeProvider>
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
                {/*
                <DataTable
                  table={{columns: coltab, rows: dataTabelTDS}}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder/>*/}
                  <ThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                      title={""}
                      data={dataTabelTDS}
                      columns={rowmdatatable}
                    />
                    </ThemeProvider>
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
		            <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                      title={""}
                      data={dataTabeltemp}
                      columns={rowmdatatable}
                    />
                  </ThemeProvider>
              {/* kotak tabel berisi data */}
              <MDBox pt={3}>

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
