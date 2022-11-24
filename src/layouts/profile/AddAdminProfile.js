import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
// @mui material components
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import * as React from 'react';
import Menu from '@mui/material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
// import { useState, useRef } from "react";

const AddAdminProfile = () => {
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()
    const [info, setInfo] = useState({
        nickname: '',
        des: '',
        avatar: '',
        bgPic: '',
    })

    // const { token } = useContext(AuthContext)

    // const navigate = useNavigate()
    // const accountRef = useRef();
    // const passwordRef = useRef();
    const [loading, setLoading] = useState(false)
    const AddUserInfo = async (event) => {
        let UserInfoData = new FormData(event.target)
        event.preventDefault()
        // console.log("UserInfoData", UserInfoData)
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/userInfos`,
            {
                method: "POST",
                body: UserInfoData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        const json = await response.json();
        // console.log(json)
        // window.alert(json.messages)
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/profile')
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={AddUserInfo}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Add New profile</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField value={info?.nickname} onChange={(e) => { setInfo({ ...info, nickname: e.target.value }) }} name="name" fullWidth label="Nickname" /></MDBox>

                                    <MDBox mb={3}><TextField value={info?.des} onChange={(e) => { setInfo({ ...info, des: e.target.value }) }} name="name" fullWidth label="Description" /></MDBox>

                                    <MDBox mb={3}>
                                        <Button variant="contained" component="label" color='primary'>
                                            <MDTypography color='white' variant="p">
                                                <Grid container spacing={1}>
                                                    <Grid item><Icon>photo_library</Icon></Grid>
                                                    <Grid item>Upload Cover</Grid>
                                                </Grid>
                                            </MDTypography>
                                            <input name='avatar' hidden accept="image/*" single type="file" />
                                        </Button>
                                    </MDBox>
                                    <MDBox mb={3}>
                                        <Button variant="contained" component="label" color='primary'>
                                            <MDTypography color='white' variant="p">
                                                <Grid container spacing={1}>
                                                    <Grid item><Icon>photo_library</Icon></Grid>
                                                    <Grid item>Upload Cover</Grid>
                                                </Grid>
                                            </MDTypography>
                                            <input name='bgPic' hidden accept="image/*" single type="file" />
                                        </Button>
                                    </MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Add A New Profile
                                            </MDTypography>
                                        </Button>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}

export default AddAdminProfile