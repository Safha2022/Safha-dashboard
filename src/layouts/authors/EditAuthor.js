import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// @mui material components
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from "context/Auth";

function EditAuthor() {
    const handleOnChange = (e) => {
        user[e.target.name] = user[e.target.value]
    }
    const [author, setUser] = useState({
        username: '',
        email: '',
        // password: '',
        userTypeId: ''
    })
    const { token } = useContext(AuthContext);
    // console.log("token",token)
    const { id } = useParams()
    const navigate = useNavigate()
    const editAuthor = async (event) => {
        event.preventDefault()
        // console.log("userData",userData)
        const edit = await fetch(`${process.env.REACT_APP_API_URL}/admins/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify(author),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const json = await edit.json()
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/authors')
        }
    }

    useEffect(() => {
        async function getAuthor() {
            const UserData = await fetch(`${process.env.REACT_APP_API_URL}/admins/show/${id}` , {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const json = await UserData.json()
            setUser(json.data)
        }
        getUser();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editAuthor}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit Author</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField name="username" fullWidth label="Username" value={author.username} onChange={(e) => setUser({ ...user, username: e.target.value })} /></MDBox>
                                    <MDBox mb={3}><TextField name="email" fullWidth label="Email" value={author.email} onChange={(e) => setUser({ ...user, email: e.target.value })} /></MDBox>
                                    {/* <MDBox mb={3}><TextField name="password" fullWidth label="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} /></MDBox> */}
                                    <MDBox mb={3}><TextField name="userTypeId" fullWidth value={user.userTypeId} label="User Type Id" onChange={(e) => setUser({ ...user, userTypeId: e.target.value })} /></MDBox>
                                        <MDBox>
                                            <Button variant="contained" type="submit">
                                                <MDTypography color='white' variant="p">
                                                    Edit Authors
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

export default EditAuthor