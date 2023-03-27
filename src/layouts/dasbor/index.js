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


// Dashboard components

import React from 'react'

import { useState, useEffect, ReactDOM } from "react";
import { db } from "sensordata/configfb";
import { ref, onValue, getDatabase, get, DataSnapshot, limitToFirst, onChildAdded, orderByKey,query, onChildChanged, limitToLast } from "firebase/database";
import addNotification from "react-push-notification";
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import { Datadog } from "styled-icons/simple-icons";
//import { PushNotification } from "react-push-notification/dist/notifications/Storage";
//import { Notifications } from "react-push-notification/dist/notifications/Storage";


//fungsi string tanggal kebutuhan deploy live
  /*
  const today = new Date();
  if(today.getDate() < 10 && today.getMonth()< 10)
  {
   var hari = "0" + today.getDate() + "/" + "0" + (today.getMonth()+1) + "/" + today.getFullYear();
   var pathari = today.getDate() + "-" + "0" + (today.getMonth()+1) + "-" + today.getFullYear();
  }
  else if(today.getDate() >= 10 && today.getMonth() >= 10)
  {
    var hari = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
    var pathari = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
    //console.log(hari);
  }
  else if(today.getDate() < 10 && today.getMonth() >= 10)
  {
    var hari = "0" + today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
    var pathari = "0" + today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
  }
  // var path = "Sensordat/" + bulan + "/" + 
  */
  
  
//set tanggal untuk demo (manual)
  var hari = "24/09/2022";
  var path = "Sensordat/09-2022/24-09-2022"

const datasource = ref(db, path);
var que = query(datasource, limitToLast(1000));

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

var avgph;
var minph;
var maxph;

var avgtds;
var mintds;
var maxtds;

var avgsuhu;
var minsuhu;
var maxsuhu;

var avgpump;
var minpump;
var maxpump;

var avgaer;
var minaer;
var maxaer;

function Dasbor() {
  
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
            arrVal.data.Tanggal === hari
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
    if (nilaido < 3){
      var pesan = 'DO saat ini = ' + nilaido + " PPM";
      addNotification({
        title: "Warning !",
        subtitle: "DO Dalam Level Bahaya",
        message: pesan,
        theme: "red",
        duration: 5000,
        native: true // when using native, your OS will handle theming.
      });
    }
    else if (nilaiph > 10 || nilaiph < 3){
      var pesan = 'PH saat ini = ' + nilaiph;
      addNotification({
        title: "Warning !",
        subtitle: "PH Dalam Level Bahaya",
        message: pesan,
        theme: "red",
        duration: 5000,
        native: true // when using native, your OS will handle theming.
      });
    }
    else if (nilaisuhu > 35 || nilaisuhu < 25){
      var pesan = "Suhu saat ini = " + nilaisuhu + "\u00b0 C";
      addNotification({
        title: "Warning !",
        subtitle: "Suhu Dalam Level Bahaya",
        message: pesan,
        theme: "red",
        duration: 5000,
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
    if(nilaido >= 5)
    {
      setStatdo("AMAN");
      setColordo("success");
    }
    if(nilaido < 5 && nilaido >=3)
    {
      setStatdo("WARNING");
      setColordo("warning");
    }
    if(nilaido < 3)
    {
      setStatdo("DANGER");
      setColordo("error");
    }
    if(nilaiph <= 10  && nilaiph >= 6.5)
    {
      setStatph("AMAN");
      setColorph("success");
    }
    if(nilaiph < 6.5  && nilaiph >= 4)
    {
      setStatph("WARNING");
      setColorph("warning");
    }
    if(nilaiph < 4 || nilaiph > 10)
    {
      setStatph("DANGER");
      setColorph("error");
    }
    if(nilaitds <= 500)
    {
      setStattds("AMAN");
      setColortds("success");
    }
    if(nilaitds > 500 && nilaitds < 800)
    {
      setStattds("WARNING");
      setColortds("warning");
    }
    if(nilaitds >=800)
    {
      setStattds("DANGER");
      setColortds("error");
    }
    if(nilaisuhu < 30 && nilaisuhu > 25)
    {
      setStatsuhu("AMAN");
      setColorsuhu("success");
    }
    if((nilaisuhu <= 25 && nilaisuhu > 20) || (nilaisuhu >= 30 && nilaisuhu < 35))
    {
      setStatsuhu("WARNING");
      setColorsuhu("warning");
    }
    if(nilaisuhu <= 20 || nilaisuhu >= 35)
    {
      setStatsuhu("DANGER");
      setColorsuhu("error");
    }
  }
/*
  const inserttds = async () => {}
  const insertph = async () => {}
  const insertsuhu = async () => {

    dataSuhu = dataSuhu.slice((thisbuff.length - 13), thisbuff.length);
  }
  const insertdo = async () => {}
  const insertpump = async () => {}
  const insertaer = async () => {}
*/

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
    onValue(que,(snapshot) =>
  {
  var thisbuff =[];
  var chk = ["0"];
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
      arrVal.data.Tanggal === hari
    ), 
    
    //console.log(hari),

    
    dataDO = thisbuff.map((arrVal, index)=> {
    return (parseFloat((arrVal.data.DO).toFixed(2)));
    }),

    avgdo = parseFloat(getAvg(dataDO).toFixed(2)),
    mindo = Math.min.apply(null,dataDO),
    maxdo = Math.max.apply(null, dataDO),
    dataDO = dataDO.slice((thisbuff.length - 13), thisbuff.length),
    /*
    console.log("ini data DO"),
    console.log(dataDO), */

    dataSuhu = thisbuff.map((arrVal, index)=> {
      return (parseFloat((arrVal.data.Suhu).toFixed(2)));
      }),
    avgsuhu = getAvg(dataSuhu).toFixed(2),
    minsuhu = Math.min.apply(null, dataSuhu),
    maxsuhu = Math.max.apply(null, dataSuhu),
    
    dataSuhu = dataSuhu.slice((thisbuff.length - 13), thisbuff.length),

    dataPH = thisbuff.map((arrVal, index)=> {
      return (parseFloat((arrVal.data.PH).toFixed(2)));
      }),
    avgph = getAvg(dataPH).toFixed(2),
    minph = Math.min.apply(null, dataPH),
    maxph = Math.max.apply(null, dataPH),
    dataPH = dataPH.slice((thisbuff.length - 13), thisbuff.length),

    

    dataTDS = thisbuff.map((arrVal, index)=> {
      return (parseFloat((arrVal.data.TDS).toFixed(2)));
      }),
    avgtds = getAvg(dataTDS).toFixed(2),
    mintds = Math.min.apply(null, dataTDS),
    maxtds = Math.max.apply(null, dataTDS),
    dataTDS = dataTDS.slice((thisbuff.length - 13), thisbuff.length),

    nilaiph = dataPH[12], nilaido = dataDO[12], nilaisuhu = dataSuhu[12], nilaitds = dataTDS[12],
    

    dataPump = thisbuff.map((arrVal, index)=> {
      return (arrVal.data.Pump);
      }),
      avgpump = parseInt(Math.round(getAvg(dataPump))),
      maxpump = Math.max.apply(null, dataPump),
      minpump = Math.min.apply(null, dataPump),
      dataPump = dataPump.slice((thisbuff.length - 13), thisbuff.length),
    
      nilaipump=dataPump[12],

      dataAerator = thisbuff.map((arrVal, index)=> {
        return (arrVal.data.Aerator);
        }),
        avgaer = parseInt(Math.round(getAvg(dataAerator))),
        maxaer = Math.max.apply(null, dataAerator),
        minaer = Math.min.apply(null, dataAerator),
        dataAerator = dataAerator.slice((thisbuff.length - 13), thisbuff.length),
      
    nilaiaerator=dataAerator[12],
    
    dataTime = thisbuff.map((arrVal, index)=> {
      return (arrVal.data.Time);
    }),
    dataTime = dataTime.slice((thisbuff.length - 13), thisbuff.length),
      



    insertstatus(),
    inseroutput()
    )
    console.log(snapshot.val());
    console.log(buffArr);
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
                rata2={avgph}
                maxval={maxph}
                minval={minph}
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
                rata2 = {avgsuhu}
                maxval = {maxsuhu}
                minval = {minsuhu}
                count=
                {
                  String(nilaisuhu) + " \u00b0C"
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
                
                rata2= {avgtds}
                maxval={maxtds}
                minval={mintds}
                count=
                {
                  String(nilaitds) + " PPM"
                  
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
                title="Duty Cycle Aerator"
                rata2 = {avgaer}
                maxval = {maxaer}
                minval = {maxaer}
                count=
                {
                  <>
                  {nilaiaerator} <strong>%</strong>
                  </>
                }
                percentage={{
                  color: coloraer,
                  amount: stataer,
                  label: "Perubahan",
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
                title="Duty Cycle Pompa"
                rata2 = {avgpump}
                maxval = {maxpump}
                minval = {minpump}
                count=
                {
                  
                  String(nilaipump) + " %"
                  
                }
                percentage={{
                  color: colorpump,
                  amount: statpump,
                  label: "Perubahan",
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
                    Data Total Padatan Larut (<strong>PPM</strong>) 
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
                  datasets: { label: "Total Padatan Larut", data: dataTDS},}}
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
                  datasets: { label: "Duty Cycle Pompa", data: dataPump},}}

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
                  datasets: { label: "Duty Cycle Aerator", data: dataAerator},}}

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

export default Dasbor;