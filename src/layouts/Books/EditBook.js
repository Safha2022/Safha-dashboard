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
import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import Avatar from '@mui/material/Avatar';

// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from "context/Auth";


function EditBook() {
    const { token } = useContext(AuthContext);
    const [book, setBook] = useState({
        name: '',
        userId: '',
        pagesCount: '',
        categoryId: '',
        des: '',
        cover: '',
        lang: '',
        publish: '',

    })
    const { id } = useParams()
    const navigate = useNavigate()
    const editBook = async (event) => {
        event.preventDefault()
        // let bookData = new FormData(event.target)
        const added = await fetch(`${process.env.REACT_APP_API_URL}/books/edit/${id}`, {
            method: 'PUT',
            body:  JSON.stringify(book),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
        const json = await added.json()
        alert(json.messages.join(' '))
        if (json.success) {
            navigate('/books')
        }
    }
    // const deletePhoto = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this photo?')) {
    //       const deleted = await fetch(`${process.env.REACT_APP_API_URL}/photos/${id}`, {
    //         method: 'DELETE'
    //       })
    //       const result = await deleted.json()
    //       const remainedPhotos = trip.Photos.filter((photo) => {
    //         return photo.id !== id
    //       })
    //       setTrip({...trip, Photos: remainedPhotos})
    //       alert(result.messages.join(' '))
    //     }
    //   }
    useEffect(() => {
        async function getBook() {
            const BookData = await fetch(`${process.env.REACT_APP_API_URL}/books/edit/${id}`)
            const json = await BookData.json()
            setBook(json.data)
        }
        getBook();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <form method="post" onSubmit={editBook}>
                            <MDBox p={3}>
                                <MDTypography variant='h5'>Edit Book</MDTypography>
                                <MDBox pt={4} pb={2}>
                                    <MDBox mb={3}>
                                        <TextField value={book?.name} onChange={(e) => { setBook({ ...book, name: e.target.value }) }} name="name" fullWidth label="Book Name" /></MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={book?.userId} onChange={(e) => { setBook({ ...book, userId: e.target.value }) }} name="userId" fullWidth label="Book userId" /></MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={book?.pagesCount} onChange={(e) => { setBook({ ...book, pagesCount: e.target.value }) }} name="pagesCount" fullWidth label="Book pagesCount" /></MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={book?.categoryId} onChange={(e) => { setBook({ ...book, categoryId: e.target.value }) }} name="categoryId" fullWidth label="Book categoryId" /></MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={book?.des} onChange={(e) => { setBook({ ...book, des: e.target.value }) }} name="des" fullWidth label="Book Description" /></MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={book?.cover} onChange={(e) => { setBook({ ...book, cover: e.target.value }) }} name="cover" fullWidth label="Book cover" /></MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={book?.lang} onChange={(e) => { setBook({ ...book, lang: e.target.value }) }} name="lang" fullWidth label="Book lang" /></MDBox>
                                    <MDBox mb={3}>
                                        <TextField value={book?.publish} onChange={(e) => { setBook({ ...book, publish: e.target.value }) }} name="publish" fullWidth label="Book publish" /></MDBox>



                                    {/* <MDBox mb={3}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={trip.date}
                                                renderInput={(props) => <TextField name="date" fullWidth {...props} />}
                                                label="Trip Date"
                                                inputFormat="YYYY-MM-DD HH:mm:ss"
                                                mask="____-__-__ __:__:__"
                                                onChange={(newValue) => {
                                                    setTrip({ ...trip, date: dayjs(newValue).format("YYYY-MM-DD HH:mm:ss") })
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </MDBox> */}
                                    {/* <MDBox mb={3}>
                                        <Grid container spacing={2}>
                                            {
                                                trip.Photos.map((photo, i) => {
                                                    return (
                                                        <Grid item key={i}>
                                                            <Avatar
                                                                alt=""
                                                                variant="square"
                                                                src={photo.file}
                                                                sx={{ width: 150, height: 150 }}
                                                            />
                                                            <IconButton aria-label="delete" onClick={() => {deletePhoto(photo.id)}}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                        <Button variant="contained" component="label" color='primary'>
                                            <MDTypography color='white' variant="p">
                                                <Grid container spacing={1}>
                                                    <Grid item><Icon>photo_library</Icon></Grid>
                                                    <Grid item>Upload Photos</Grid>
                                                </Grid>
                                            </MDTypography>
                                            <input hidden name="photo" accept="image/*" multiple type="file" />
                                        </Button>
                                    </MDBox> */}
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

export default EditBook