import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// @mui material components
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";


import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function AddBook() {

    const { token } = useContext(AuthContext)
    const handleOnChange = (e) => {
        Book[e.target.name] = Book[e.target.value]
    }
    const [publish, setPublish] = useState('')
    const [Book, setBook] = useState({
        name: '',
        pagesCount: '',
        categoryId: '',
        des: '',
        publish: '',
        publisherId:'',
        lang: '',
        ISBN: '',
        author: '',
        kinle: '',
        paper: '',
        cover: '',

    })
    const navigate = useNavigate()
    const AddBook = async (event) => {
        let BookData = new FormData(event.target)
        event.preventDefault()
        console.log("BookData", BookData)
        console.log("event.target", event.target)
        const added = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: BookData
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
                                    <MDBox mb={3}><TextField name="name" fullWidth label="name" /></MDBox>
                                    {/* <MDBox mb={3}><TextField name="userId" fullWidth label="userId" value={Book.userId} onChange={(e) => setBook({ ...Book, userId: e.target.value })} /></MDBox> */}
                                    <MDBox mb={3}><TextField name="pagesCount" fullWidth label="Pages" /></MDBox>
                                    <MDBox mb={3}><TextField name="categoryId" fullWidth label="categoryId"/></MDBox>
                                    <MDBox mb={3}><TextField name="des" fullWidth label="des" /></MDBox>
                                    <MDBox mb={3}><TextField name="author" fullWidth label="Author"/></MDBox>
                                    <MDBox mb={3}><TextField name="ISBN" fullWidth label="ISBN" /></MDBox>
                                    {/* <MDBox mb={3}><TextField name="cover" fullWidth label="cover" value={Book.cover} onChange={(e) => setBook({ ...category, cover: e.target.value })} /></MDBox> */}
                                    {/* <MDBox mb={3}><TextField name="publish" fullWidth label="publish" value={Book.publish} onChange={(e) => setBook({ ...Book, publish: e.target.value })} /></MDBox> */}
                                    <MDBox mb={3}><TextField name="lang" fullWidth label="lang" /></MDBox>
                                    {/* <MDBox mb={3}><TextField name="publish" fullWidth label="publish" value={Book.publish} onChange={(e) => setBook({ ...Book, publish: e.target.value })} /></MDBox> */}
                                    <MDBox mb={3}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                
                                                renderInput={(props) => <TextField name='publish' fullWidth {...props} />}
                                                label="Publish Date"
                                                // value={publishDate}
                                                value={publish}
                                                // onChange={(e) => setBook({ ...Book, publish: e.target.value })}
                                                inputFormat='YYYY-MM-DD HH:mm:ss'
                                                mask='____-__-__ __:__:__'
                                                onChange={(newValue) => {
                                                    setPublish(dayjs(newValue).format("YYYY-MM-DD HH:mm:ss"))
                                                }}
                                                // onChange={(e) => setBook({ ...Book, publish: dayjs(e).format("YYYY-MM-DD HH:mm:ss") })}
                                            />
                                        </LocalizationProvider>
                                    </MDBox>
                                    <MDBox mb={3}><TextField name="publisherId" fullWidth label="publisherId"  /></MDBox>
                                    {/* <MDBox mb={3}><TextField name="paper" fullWidth label="Paper"  /></MDBox> */}
                                    {/* <MDBox mb={3}><TextField name="kindle" fullWidth label="Kindle" /></MDBox> */}
                                    {/* <MDBox mb={3}><Checkbox  name="kindle" /></MDBox> */}
                                    <MDBox mb={3}>
                                        <FormControlLabel
                                            control={
                                            <Checkbox value='1' name="kindle" />
                                            }
                                            label="Kindle"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox value='1' name="paper" />
                                            }
                                            label="Paper"
                                        />
                                    </MDBox>
                                    <MDBox mb={3}>
                                        <Button variant="contained" component="label" color='primary'>
                                            <MDTypography color='white' variant="p">
                                                <Grid container spacing={1}>
                                                    <Grid item><Icon>photo_library</Icon></Grid>
                                                    <Grid item>Upload Cover</Grid>
                                                </Grid>
                                            </MDTypography>
                                            <input name='cover' hidden accept="image/*" single type="file" />
                                        </Button>
                                    </MDBox>
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