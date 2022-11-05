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
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { AuthContext } from "context/Auth";

function EditCategory() {
    
    const { token } = useContext(AuthContext);
    console.log("token",token)
    const [user, setUser] = useState({
        name: '',
        des: '',
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const editCategory = async (event) => {
        event.preventDefault()
        let userData = new FormData(event.target)
        const added = await fetch(`${process.env.REACT_APP_API_URL}/categories/edit/${id}`, {
            method: 'PUT',
            body: userData,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const json = await added.json()
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/categories')
        }
    }

    // useEffect(() => {
    //     async function getUser() {
    //         const UserData = await fetch(`${process.env.REACT_APP_API_URL}/admins/show/${id}`)
    //         const json = await UserData.json()
    //         setUser(json.data)
    //     }
    //     getUser();
    // }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editCategory}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit Category</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}>
                                        <TextField value={user?.name} onChange={(e) => { setUser({ ...user, name: e.target.value }) }} name="name" fullWidth label="User Name" />
                                    </MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={user?.des} onChange={(e) => { setUser({ ...user, des: e.target.value }) }} name="des" fullWidth label="User des" />
                                    </MDBox>

                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Edit Users
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

export default EditCategory