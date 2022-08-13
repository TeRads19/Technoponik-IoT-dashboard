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
import { useState, useEffect } from "react";
import { db } from "sensordata/configfb";
import { ref, onValue, set,get, query, limitToFirst } from "firebase/database";
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList"; unsomment bila ingin enable message
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Switch from "@mui/material/Switch";
import MuiInput from '@mui/material/Input';
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import pumpimg from "assets/images/pumphidro.jpg"
import aerimg from "assets/images/aquabuble.jpg"

const Input = styled(MuiInput)`
  width: 42px;
`;

const Kartu = ({img, title, isi}) => (
  <Card>
    <CardHeader 
    title={title} 
    subheader={<MDTypography variant="body2" >Interface untuk pengaturan secara manual</MDTypography>}/>
    <CardMedia component="img" image={img} height="300" />
    <CardContent>
      <MDTypography variant="caption" >{isi}</MDTypography>
    </CardContent>
  </Card>

);



const datasource = ref(db, 'ManualOvrd');
var nilaipump ;
var nilaiaerator;


var ovrd = false;

function Overview() {

  const [ovrdpump, setOverdpump] = useState(false);

  const [value, setValue] = useState(0);

  const [value2, setValue2] = useState(0);

  const sentpumpaer = () => 
  {
    if(ovrdpump == true){
      set(datasource,{ovrd :ovrd, Aerator: value2, Pump: value});
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue, sentpumpaer())
  };
  const handleChange2 = (event, newValue2) => {
    setValue2(newValue2
      , sentpumpaer())
    
  };
  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value)
    , sentpumpaer());

  };
  const handleInputChange2 = (event) => {
    setValue2(event.target.value === '' ? '' : Number(event.target.value),
    sentpumpaer());
  };

  const setpumpaer = (pump , aer) =>
  {
    setValue(pump);
    setValue2(aer);
  }

  useEffect(() => {
    onValue(datasource,(snapshot) =>
    {
      ovrd = snapshot.val().ovrd;
      nilaipump = snapshot.val().Pump;
      nilaiaerator = snapshot.val().Aerator;
      setOverdpump(ovrd);
      setpumpaer(nilaipump, nilaiaerator);
    });
  },[]);


  const handleOverride = async () =>{
    ovrd = !ovrd
    setOverdpump(ovrd);
    set(datasource,{ovrd :ovrd, Pump: nilaipump, Aerator: nilaiaerator});
  }

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const handleBlur2 = () => {
    if (value2 < 0) {
      setValue2(0);
    } else if (value2 > 100) {
      setValue2(100);
    }
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>

        <MDBox mt={5} mb={3}>


            <Grid item="flex">
                <Grid>
                  
                  {/* Bagian untuk informasi profil */}
                  <ProfileInfoCard
                    title="Profil Engineer Keren"
                    description="Hi, Saya Tedy Anggi, mahasiswa Universitas Diponegoro yang sedang menempuh skripsi tugas akhir.
                    Adapun aplikasi TechnoPonik ini merupakan aplikasi untuk monitoring dan kontrol sistem akuaponik untuk skripsi tugas akhir.
                    "
                    info={{
                      fullName: "Tedy Anggi Firdaus",
                      mobile: "0812-8802-4054",
                      email: "Teddy.anggi@gmail.com",
                      location: "Jakarta, Indonesia",
                    }}
                    social={[
                      {
                        link: "https://www.facebook.com/teddy.anggi",
                        icon: <FacebookIcon />,
                        color: "facebook",
                      },
                      {
                        link: "https://twitter.com/TedyAnggi",
                        //link: "https://twitter.com/creativetim",
                        icon: <TwitterIcon />,
                        color: "twitter",
                      },
                      {
                        link: "https://www.instagram.com/ted.sky19/",
                        icon: <InstagramIcon />,
                        color: "instagram",
                      },
                      {
                        link: "https://www.linkedin.com/in/tedyanggi/",
                        icon: <LinkedInIcon />,
                        color: "linkedin",
                      },
                    ]}
                    action={{ route: "", tooltip: "Edit Profile" }}
                    shadow={false}
                  />
                </Grid>

              <Grid>
                <MDBox >
                  <MDTypography variant="h4" fontWeight="heavy">
                    Set Manual Kecepatan Pompa dan Aerator
                  </MDTypography>
                  <MDBox>
                    <MDTypography variant="button" color="text">
                      Manual override
                    </MDTypography>
                  </MDBox>
                </MDBox>
                    {/* ini untuk aerator nya*/}           

                <MDBox mt={2} mb={1}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={8} lg={6}>
                    <MDBox mb={1} pt={0} p={2} alignItems="center" coloredShadow="dark">
                      <Kartu 
                      img={aerimg} 
                      title={
                                <MDTypography variant="h5" fontWeight="medium">
                                {"Pengaturan Untuk Aerator"}
                                </MDTypography>
                            } 
                      isi="Aerator berfungsi sebagai penyuplai oksigen dan menjaga keseimbangan pH kolam dengan menjaga laju daur amoniak"/>
                      <MDBox mb={1} pt={1} p={1} display="flex" alignItems="center">
                        <Slider value={value2} onChange={handleChange2} aria-label="Small" valueLabelDisplay="auto" color="secondary"/>
                        <Input
                            value={value2}
                            size="small"
                            onChange={handleInputChange2}
                            onBlur={handleBlur2}
                            inputProps={{
                              step: 10,
                              min: 0,
                              max: 100,
                              type: 'number',
                              'aria-labelledby': 'input-slider',
                            }}
                          />
                          </MDBox>
                      </MDBox>
                      </Grid>

                      <Grid item xs={12} md={8} lg={6}>
                      <MDBox mb={1} pt={1} p={1} alignItems="center" coloredShadow="dark">
                        <Kartu 
                        img={pumpimg} 
                        title={
                        <MDTypography variant="h5" fontWeight="medium">
                        {"Pengaturan Untuk Pompa"}
                        </MDTypography>
                        } 
                        isi="Pompa berperan untuk mendistribusikan air dan nutrisi dari kolam ikan ke hidroponik sekaligus membantu terjadinya daur amoniak"/>
                        <MDBox mb={1} pt={1} p={2} 
                        display="flex" alignItems="center">
                            <Slider 
                            value={value} 
                            onChange={handleChange} 
                            aria-label="Small" 
                            valueLabelDisplay="auto"
                            />
                            <Input
                                value={value}
                                size="small"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                  step: 10,
                                  min: 0,
                                  max: 100,
                                  type: 'number',
                                  'aria-labelledby': 'input-slider',
                                }}
                              />
                        </MDBox>
                      </MDBox>
                      </Grid>

                  </Grid>
                </MDBox>
                      

                <Grid display="flex" container justifyContent="center" >            
                      <MDBox display="flex" alignItems="center">
                    <Switch checked={ovrdpump} onChange={() => handleOverride()} value="dynamic-class-name" />
                    <MDTypography variant="h5" fontWeight="medium">
                      {"Manual Override Pompa & Aerator"}
                    </MDTypography>
                  </MDBox>
                </Grid>

              </Grid>


              

            </Grid>

        </MDBox>




      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
