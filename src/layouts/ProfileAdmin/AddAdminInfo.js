// import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
// import DashboardNavbar from "examples/Navbars/DashboardNavbar"
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

const AddProfile = () => {
    // const { token } = useContext(AuthContext)
    // const navigate = useNavigate()
    // const [info, setInfo] = useState({
    //     nickname: '',
    //     des: '',
    //     avatar: '',
    //     bgPic: '',
    // })

    const { token } = useContext(AuthContext)

    const navigate = useNavigate()
    const accountRef = useRef();
    const passwordRef = useRef();
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
        // <DashboardLayout>
        //     <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={AddUserInfo}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Add New profile</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <div class="cardAdd">
                                        <div id='register' className="my-5 p-5">
                                            {/* <h2 id='title' className='mb-1'>Welcom to Safha</h2> */}
                                            <div className='form-field mb-2'>
                                                <label htmlFor='nickname' className='mb-1'>Nickname:</label>
                                                <input type='text' name="nickname" id="email" className='form-control' />
                                            </div>
                                            <div className='form-field mb-1'>
                                                <label htmlFor='dex' className='mb-1'>Description:</label>
                                                <textarea name="des" id="password" className='form-control'>
                                                </textarea>
                                            </div>
                                            <div className='form-field mb-1'>
                                                <label htmlFor='avatar' className='mb-1'>Avatar:</label>
                                                <input type='file' name="avatar" className='form-control' />
                                            </div>
                                            <div className='form-field mb-1'>
                                                <label htmlFor='bgPic' className='mb-1'>Background Picture:</label>
                                                <input type='file' name="bgPic" className='form-control' />
                                            </div>
                                            <button className='btn btn-primary w-49' id='signup-bttn'>
                                                {loading ? 'Please Wait' : 'Add'}
                                            </button>
                                        </div>
                                    </div>
                                </MDBox>
                            </MDBox>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        // </DashboardLayout>
    )
}

export default AddProfile