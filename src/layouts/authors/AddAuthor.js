import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// @mui material components
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";


import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context/Auth";

function AddAuthor() {
    const { token } = useContext(AuthContext);
    const [author, setAuthor]= useState({
        username:'',
        email:'',
        password:'',
        userTypeId: 3
    })
    const navigate = useNavigate()
    const addAuthor = async (event) => {
        event.preventDefault()
        console.log(author)        
        const added = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body:  JSON.stringify(author)
        })
        const json = await added.json()
        console.log(json)
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/author')
        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={addAuthor}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Add New Author</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField name="username" fullWidth label="Username" value={author.username} onChange={(e) => setAuthor({...author, username: e.target.value})}/></MDBox>
                                    <MDBox mb={3}><TextField name="email" fullWidth label="Email" value={author.email} onChange={(e) => setAuthor({...author, email: e.target.value})} /></MDBox>
                                    <MDBox mb={3}><TextField name="password" fullWidth label="Password" value={author.password} onChange={(e) => setAuthor({...author, password: e.target.value})} /></MDBox>
                                    {/* <MDBox mb={3}><TextField name="password" fullWidth label="PasswordConfirmation" value={author.passwordConfirmation} onChange={(e) => setAuthor({...author, passwordConfirmation: e.target.value})} /></MDBox> */}
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Add A New Author
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

export default AddAuthor