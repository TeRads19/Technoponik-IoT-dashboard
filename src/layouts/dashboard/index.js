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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// import ControllerCard from "examples/Cards/ControllerCard";

// @mui material components
import Icon from "@mui/material/Icon";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import React from 'react'

import { useState, useEffect, ReactDOM } from "react";
import { db } from "sensordata/configfb";
import { ref, onValue, getDatabase, get, DataSnapshot, limitToFirst, onChildAdded, orderByKey,query, onChildChanged, limitToLast } from "firebase/database";
import addNotification from "react-push-notification";
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import { Datadog } from "styled-icons/simple-icons";
//import { PushNotification } from "react-push-notification/dist/notifications/Storage";
//import { Notifications } from "react-push-notification/dist/notifications/Storage";

const datasource = ref(db, 'Sensordat');
var que = query(datasource,limitToLast(13));

var dataSuhu = [];
var dataPH = [];
var dataDO = [];
var dataTDS = [];
var dataPump = [];
var dataAerator = [];
var dataTime = [];
var nilaiph;
var nilaisuhu;
var nilaido;
var nilaitds;
var nilaipump;
var nilaiaerator;

var avgdo;
var mindo;
var maxdo;


function Dashboard() {
  
    /*
    get(que2).then((snapshot) => {
      const thisbuff = [];
  
      Object.keys(snapshot.val()).map(key =>{
      thisbuff.push({
        id: key,
        data: snapshot.val()[key]
      })})
  
        if (snapshot.exists()) {
          bffer = thisbuff.filter(arrVal =>
            arrVal.data.Tanggal === waktu
          );
  
          bffer = bffer.map((arrVal, index) => {
            return (arrVal.data); 
            });
          
            Lavgph = bffer.map((arrVal, index) => {
              return (arrVal.PH); 
            });
            Lavgdo = bffer.map((arrVal, index) => {
              return (arrVal.DO); 
            });
            Lavgtds = bffer.map((arrVal, index) => {
              return (arrVal.TDS); 
            });
            Lavgsuhu = bffer.map((arrVal, index) => {
              return (arrVal.Suhu); 
            });
            setavgph(getAvg(Lavgph).toFixed(2));
            setavgdo(getAvg(Lavgdo).toFixed(2));
            setavgtds(getAvg(Lavgtds).toFixed(2));
            setavgsuhu(getAvg(Lavgsuhu).toFixed(2));
  
          setmaxph(parseFloat(Math.max.apply(maxph,Lavgph)).toFixed(2));
          setminph(parseFloat(Math.min.apply(minph,Lavgph)).toFixed(2));
          setmaxdo(parseFloat(Math.max.apply(maxdo,Lavgdo)).toFixed(2));
          setmindo(parseFloat(Math.min.apply(mindo,Lavgdo)).toFixed(2));
          setmaxtds(parseFloat(Math.max.apply(maxtds,Lavgtds)).toFixed(2));
          setmintds(parseFloat(Math.min.apply(mintds,Lavgdo)).toFixed(2));
          setmaxsuhu(parseFloat(Math.max.apply(maxsuhu,Lavgsuhu)).toFixed(2));
          setminsuhu(parseFloat(Math.min.apply(minsuhu,Lavgsuhu)).toFixed(2));
          console.log(maxph);
        } else {
          console.log("No data available");
        }
      });
      */
  
  const today = new Date();
  
  var waktu = "0" + (today.getDate()-1) + "/" + "0" +(today.getMonth()+1) + "/" + today.getFullYear();
  var que2 = query(datasource);


/*
  const [avgph,setavgph] = useState(0);
  const [avgdo,setavgdo] = useState(0);
  const [avgtds,setavgtds] = useState(0);
  const [avgsuhu,setavgsuhu] = useState(0);

  const [maxph, setmaxph] = useState(0);
  const [minph, setminph] = useState(0);
  const [maxtds, setmaxtds] = useState(0);
  const [mintds, setmintds] = useState(0);
  const [maxdo, setmaxdo] = useState(0);
  const [mindo, setmindo] = useState(0);
  const [maxsuhu, setmaxsuhu] = useState(0);
  const [minsuhu, setminsuhu] = useState(0);
  const [minpump, setminpump] = useState(0);
  const [maxpump, setmaxpump] = useState(0);
  const [maxaer, setmaxaer] = useState(0);
  const [minaer, setminaer] = useState(0);
*/


  const getAvg = arr => {
    const fsum = (total, currentValue) => total + currentValue
    const sum = arr.reduce(fsum);
    return (sum / arr.length);
  }





  const notifMe = () => {
    if (nilaido >= 10 || nilaido < 5){
      var pesan = 'DO saat ini = ' + nilaido + " PPM";
      addNotification({
        title: "Warning !",
        subtitle: "DO Dalam Level Bahaya",
        message: pesan,
        theme: "red",
        duration: 7000,
        native: true // when using native, your OS will handle theming.
      });
    }
    else if (nilaiph > 8 || nilaiph < 6.5){
      var pesan = 'PH saat ini = ' + nilaiph;
      addNotification({
        title: "Warning !",
        subtitle: "PH Dalam Level Bahaya",
        message: pesan,
        theme: "red",
        duration: 7000,
        native: true // when using native, your OS will handle theming.
      });
    }
    else if (nilaisuhu > 30 || nilaisuhu < 25){
      var pesan = "Suhu saat ini = " + nilaisuhu + "\u00b0 C";
      addNotification({
        title: "Warning !",
        subtitle: "Suhu Dalam Level Bahaya",
        message: pesan,
        theme: "red",
        duration: 7000,
        native: true // when using native, your OS will handle theming.
      });
    }

    else if (nilaitds > 800){
      var pesan = 'TDS saat ini = ' + nilaitds;
      addNotification({
        title: "Warning !",
        subtitle: "TDS Dalam Level Bahaya"  + nilaitds + " PPM",
        message: pesan,
        theme: "red",
        duration: 7000,
        native: true // when using native, your OS will handle theming.
      });
    }  
  }

  const [users, setUsers] = useState([]);
  const [statdo,setStatdo] = useState("");
  const [colordo,setColordo] = useState("");
  const [statph,setStatph] = useState("");
  const [colorph,setColorph] = useState("");
  const [stattds,setStattds] = useState("");
  const [colortds,setColortds] = useState("");
  const [statsuhu,setStatsuhu]= useState("");
  const [colorsuhu,setColorsuhu] = useState("");

  const [stataer,setStataer]= useState("");
  const [coloraer,setColoraer] = useState("");
  const [statpump,setStatpump]= useState("");
  const [colorpump,setColorpump] = useState("");


  const insertstatus = async () => {
    if(nilaido < 12 && nilaido > 5 && nilaido>0)
    {
      setStatdo("AMAN");
      setColordo("success");
    }
    if(nilaido <= 5 || nilaido >= 12)
    {
      setStatdo("DANGER");
      setColordo("error");
    }
    if(nilaiph < 8.5 && nilaiph > 6)
    {
      setStatph("AMAN");
      setColorph("success");
    }
    if(nilaiph <= 6 || nilaiph >= 8.5)
    {
      setStatph("DANGER");
      setColorph("error");
    }
    if(nilaitds < 750)
    {
      setStattds("AMAN");
      setColortds("success");
    }
    if(nilaitds>=750)
    {
      setStattds("DANGER");
      setColortds("error");
    }
    if(nilaisuhu < 30 && nilaisuhu > 20)
    {
      setStatsuhu("AMAN");
      setColorsuhu("success");
    }
    if(nilaisuhu <= 20 || nilaisuhu >= 30)
    {
      setStatsuhu("DANGER");
      setColorsuhu("error");
    }
  }
  const inseroutput = async () => {
    var buffaer = dataAerator[12]-dataAerator[11];
    var buffpump = dataPump[12]-dataPump[11];

    if(buffaer>0){
      setStataer(["+",buffaer,"%"]);
      setColoraer("error");
    }
    if(buffaer<0 || buffaer==0){
      setStataer([buffaer,"%"]);
      setColoraer("success");
    }
    if(buffpump>0)
    {
      setStatpump(["+",buffpump,"%"]);
      setColorpump("error");
    }
    if(buffpump<0 || buffpump==0){
      setStatpump([buffpump,"%"]);
      setColorpump("success");
    }
  }

  useEffect (() => {

    notifMe();
    onValue(que2,(snapshot) =>
  {
  var thisbuff =[];
  var chk = ["0",];
  const buffArr = []; 
  Object.keys(snapshot.val()).map(key =>{
  buffArr.push({
    id: key,
    data: snapshot.val()[key]
  })})
  // di set user ini bakal render fungsi makanya assign nilai disini
  setUsers(buffArr.map((arrVal, index) => {
    return (arrVal.data); 
    }),
    thisbuff = buffArr.filter(arrVal =>
      arrVal.data.Tanggal === waktu
    ),

    
    dataDO = thisbuff.map((arrVal, index)=> {
    return (parseFloat((arrVal.data.DO).toFixed(2)));
    }),
    console.log(dataDO),
    avgdo = parseFloat(getAvg(dataDO).toFixed(2)),
    console.log(avgdo),
    mindo = Math.min.apply(null,dataDO),
    dataDO = dataDO.slice((thisbuff.length - 13), thisbuff.length),
    /*
    console.log("ini data DO"),
    console.log(dataDO), */

    dataSuhu = thisbuff.map((arrVal, index)=> {
      return (arrVal.data.Suhu);
      }),
    dataSuhu = dataSuhu.slice((thisbuff.length - 13), thisbuff.length),

    dataPH = thisbuff.map((arrVal, index)=> {
      return (arrVal.data.PH);
      }),
    dataPH = dataPH.slice((thisbuff.length - 13), thisbuff.length),

    

    dataTDS = thisbuff.map((arrVal, index)=> {
      return (arrVal.data.TDS);
      }),
    dataTDS = dataTDS.slice((thisbuff.length - 13), thisbuff.length),

    nilaiph = dataPH[12], nilaido = dataDO[12], nilaisuhu = dataSuhu[12], nilaitds = dataTDS[12],
    

    dataPump = thisbuff.map((arrVal, index)=> {
      return (arrVal.data.Pump);
      }),
      dataPump = dataPump.slice((thisbuff.length - 13), thisbuff.length),
    
      nilaipump=dataPump[12],

      dataAerator = thisbuff.map((arrVal, index)=> {
        return (arrVal.data.Aerator);
        }),
        dataAerator = dataAerator.slice((thisbuff.length - 13), thisbuff.length),
      
    nilaiaerator=dataAerator[12],
    
    dataTime = thisbuff.map((arrVal, index)=> {
      return (arrVal.data.Time);
    }),
    dataTime = dataTime.slice((thisbuff.length - 13), thisbuff.length),
      



    insertstatus(),
    inseroutput()
    )
    
  });
  },[nilaiph, nilaido, nilaisuhu, nilaitds,avgdo]);

  return (
    <DashboardLayout>               
      <DashboardNavbar />
      <MDBox py={3}>
        {/* ini untuk tampilan sensor DO */}
        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="hive"
                title="pH Kolam"
                count=
                {
                  <>
                  {nilaiph}
                  </>
                }
                percentage={{
                  color: [colorph],
                  amount: [statph],
                  label: "",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="opacity"
                title="Oksigen Terlarut"
                rata2 = {avgdo}
                maxval = {maxdo}
                minval = {mindo}
                count=
                {
                  
                  String(nilaido) + " PPM"
                  
                }
                percentage={{
                  color: colordo,
                  amount: [statdo],
                  label: "",
                }}
              />
            </MDBox>
          </Grid>

          {/* ini untuk tampilan sensor pH */}
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="thermostat"
                title="Suhu Air"
                count=
                {
                  nilaisuhu + " \u00b0C"
                }
                percentage={{
                  color: [colorsuhu],
                  amount: [statsuhu],
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          {/* ini untuk tampilan sensor TDS */}
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="grain"
                title="Total Dissolved Solid"
                count=
                {
                  nilaitds + " PPM"
                  
                }
                percentage={{
                  color: [colortds],
                  amount: [stattds],
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          {/* ini untuk tampilan sensor suhu */}
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="opacity"
                title="Aerator Speed"
                count=
                {
                  <>
                  {nilaiaerator} <strong>%</strong>
                  </>
                }
                percentage={{
                  color: coloraer,
                  amount: stataer,
                  label: "On Speed",
                }}
              />
            </MDBox>
          </Grid>
          {/* ini untuk tampilan kecepatan pompa */}
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Pump Speed"
                count=
                {
                  <>
                  {nilaipump} <strong>%</strong>
                  </>
                }
                percentage={{
                  color: colorpump,
                  amount: statpump,
                  label: "On Speed",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>


        <MDBox mt={4.5}>
          <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Data pH Kolam"
                  description={
                    <>
                      <strong>Nilai PH selama 1 jam terakhir</strong> .
                    </>

                  }
                  date="Data dikirim setiap 5 menit"
                  chart={{labels: dataTime,
                  datasets: { label: "PH Kolam", data: dataPH},}}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>            
              <MDBox mb={3}>
                <ReportsLineChart
                  color ="info"
                  title =
                  {
                    <>
                    Data Oksigen Terlarut (<strong>PPM</strong>) 
                    </>
                  }
                  description = 
                  {                    
                    <>
                      <strong>Nilai DO selama 1 jam terakhir</strong> .
                    </>
                  }
                  date="Data dikirim setiap 5 menit"
                  chart={{labels: dataTime,
                  datasets: { label: "Dissolved Oxygen", data: dataDO},}}         
                />
              </MDBox>

            </Grid>



            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title=
                  {
                    "Data Suhu Kolam" + ' ( \u00b0C)'
                  }
                  description=
                  {                    
                    <>
                      <strong>Nilai Suhu selama 1 jam terakhir</strong> .
                    </>
                  }
                  date="Data dikirim setiap 5 menit"
                  chart={{labels: dataTime,
                  datasets: { label: "Suhu Air", data: dataSuhu},}}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title=
                  {
                    <>
                    Data Total Dissolved Solid (<strong>PPM</strong>) 
                    </>
                  }

                  description=
                  {                    
                    <>
                      <strong>Nilai TDS selama 1 jam terakhir</strong> .
                    </>
                  }
                  date="Data dikirim setiap 5 menit"
                  chart={{labels: dataTime,
                  datasets: { label: "Total Dissolved Solid", data: dataTDS},}}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="Data Kecepatan Pompa"
                  description=
                  {                    
                    <>
                      <strong>Nilai PH selama 1 jam terakhir</strong> .
                    </>
                  }
                  date="Data dikirim setiap 5 menit"
                  chart={{labels: dataTime,
                  datasets: { label: "Pump Speed", data: dataPump},}}

                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="Data Aerator"
                  description=
                  {                    
                    <>
                      <strong>Nilai PH selama 1 jam terakhir</strong> .
                    </>
                  }
                  date="Data dikirim setiap 5 menit"
                  chart={{labels: dataTime,
                  datasets: { label: "Aerator Speed", data: dataAerator},}}

                />
              </MDBox>
            </Grid>

          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
                
    </DashboardLayout>
  );
}

export default Dashboard;