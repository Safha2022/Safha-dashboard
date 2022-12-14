import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// @mui material components
// import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Button from "@mui/material/Button";
// import Icon from "@mui/material/Icon";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "context/Auth";
// import { token } from "stylis";
// import Avatar from '@mui/material/Avatar';

// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';


function EditAdmin() {
    const { token } = useContext(AuthContext);
    const handleOnChange = (e) => {
        admin[e.target.name] = admin[e.target.value]
    }
    const [admin, setAdmin] = useState({
        username: '',
        email: '',
        // password: '',
        userTypeId: ''
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const editAdmin = async (event) => {
        event.preventDefault()
        // let adminData = new FormData(event.target)
        const added = await fetch(`${process.env.REACT_APP_API_URL}/admins/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify(admin),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const json = await added.json()
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/admins')
        }
    }

    useEffect(() => {
        async function getAdmin() {
            const AdminData = await fetch(`${process.env.REACT_APP_API_URL}/admins/show/${id}`, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const json = await AdminData.json()
            setAdmin(json.data)
            console.log("json.data", json.data)
        }
        getAdmin();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editAdmin}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit Admin</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}>
                                        <TextField value={admin?.username} onChange={(e) => { setAdmin({ ...admin, username: e.target.value }) }} name="username" fullWidth label="Admin Name" /></MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={admin?.email} onChange={(e) => { setAdmin({ ...admin, email: e.target.value }) }} name="email" fullWidth label="Admin Email" /></MDBox>

                                    {/* <MDBox mb={3}>
                                        <TextField value={admin?.password} onChange={(e) => { setAdmin({ ...admin, password: e.target.value }) }} name="password" fullWidth label="Admin Password" /></MDBox> */}

                                    <MDBox mb={3}>
                                        <TextField value={admin?.userTypeId} onChange={(e) => { setAdmin({ ...admin, userTypeId: e.target.value }) }} name="userTypeId" fullWidth label="Admin userTypeId" /></MDBox>

                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Edit Admin
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

export default EditAdmin