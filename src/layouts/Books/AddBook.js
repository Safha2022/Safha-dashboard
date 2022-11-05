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
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBook() {
    const handleOnChange = (e) => {
        Book[e.target.name] = Book[e.target.value]
    }
    const [Book, setBook] = useState({
        name: '',
        userId: '',
        pagesCount: '',
        categoryId:'',
        des: '',
        cover: '',
        lang: '',


    })
    const navigate = useNavigate()
    const addCategory = async (event) => {
        event.preventDefault()
        console.log(Book)
        const added = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Book)
        })
        const json = await added.json()
        console.log(json)
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/books')
        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={AddBook}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Add New Book</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}><TextField name="name" fullWidth label="name" value={Book.name} onChange={(e) => setBook({ ...Book, name: e.target.value })} /></MDBox>
                                    <MDBox mb={3}><TextField name="userId" fullWidth label="userId" value={Book.userId} onChange={(e) => setBook({ ...Book, userId: e.target.value })} /></MDBox>
                                    <MDBox mb={3}><TextField name="pagesCount" fullWidth label="pagesCount" value={Book.pagesCount} onChange={(e) => setBook({ ...Book, pagesCount: e.target.value })} /></MDBox>
                                    <MDBox mb={3}><TextField name="categoryId" fullWidth label="categoryId" value={Book.categoryId} onChange={(e) => setBook({ ...Book, categoryId: e.target.value })} /></MDBox>
                                    <MDBox mb={3}><TextField name="des" fullWidth label="des" value={Book.des} onChange={(e) => setBook({ ...Book, des: e.target.value })} /></MDBox>
                                    {/* <MDBox mb={3}><TextField name="cover" fullWidth label="cover" value={Book.cover} onChange={(e) => setBook({ ...category, cover: e.target.value })} /></MDBox> */}
                                    {/* <MDBox mb={3}><TextField name="publish" fullWidth label="publish" value={Book.publish} onChange={(e) => setBook({ ...Book, publish: e.target.value })} /></MDBox> */}
                                    <MDBox mb={3}><TextField name="lang" fullWidth label="lang" value={Book.lang} onChange={(e) => setBook({ ...Book, lang: e.target.value })} /></MDBox>
                                    <MDBox>
                                        <Button variant="contained" type="submit">
                                            <MDTypography color='white' variant="p">
                                                Add A New Book
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

export default AddBook