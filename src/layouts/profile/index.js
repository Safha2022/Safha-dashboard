import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "context/Auth";
import { Avatar } from "@mui/material";

function Profile() {
  const columns = [
    { Header: "id", accessor: "id", align: "left" },
    { Header: "nickname", accessor: "nickname", align: "left" },
    { Header: "des", accessor: "des", align: "center" },
    { Header: "avatar", accessor: "avatar", align: "center" },
    { Header: "bgPic", accessor: "bgPic", align: "center" },
    { Header: "options", accessor: "options", align: "right" },
  ];
  const [rows, setRows] = useState([]);
  const [tableRows, setTableRows] = useState([])
  const { token } = useContext(AuthContext)
  // console.log("Token is ",token)
  const deleteProfile = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const deleted = await fetch(`${process.env.REACT_APP_API_URL}/userInfos/` + id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      })
      const result = await deleted.json()
      const remainedRows = rows.filter((userInfos) => {
        return userInfos.id != id
      })
      setRows(remainedRows)
      alert(result.messages.join(' '))
    }

  }
  useEffect(() => {
    const jsxRows = rows?.map((userInfos) => {
      // const categoryName = getCategoryName(book.categoryId)
      // console.log("categoryName", categoryName)
      // console.log("book categories",book.Categories)
      return {
        id: <>{userInfos.id}</>,
        nickname: <>{userInfos.nickname}</>,
        des: <>{userInfos.des}</>,
        cover: <>
          <Avatar
            alt=""
            variant="square"
            src={userInfos.cover}
            sx={{ width: 70, height: 70 }}
          />
        </>,
        bgPic: <>
          <Avatar
            alt=""
            variant="square"
            src={userInfos.bgPic}
            sx={{ width: 70, height: 70 }}
          />
        </>,
        options: <>
          <MDButton variant="text" color="error" onClick={() => { deleteProfile(userInfos.id) }}>
            <Icon>delete</Icon>&nbsp;delete
          </MDButton>
          <Link to={`/userInfos/edit/${userInfos.id}`}>
            <MDButton variant="text" color="dark">
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </Link>
        </>
      };
    });
    setTableRows(jsxRows);
  }, [rows])
  useEffect(() => {
    async function getUserInfo() {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/userInfos/all`);
      const userInfos = await data.json()
      setRows(userInfos.data)
    }
    getUserInfo();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <MDTypography variant="h6" color="white">
                    UserInfos List
                    </MDTypography>
                  </Grid>
                  <Grid item>
                    <Link to='/userInfos/add'>
                      <MDButton variant="text" color="white">
                        <Icon>add_circle</Icon>&nbsp;Add
                      </MDButton>
                    </Link>
                  </Grid>
                </Grid>

              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: tableRows
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Profile;