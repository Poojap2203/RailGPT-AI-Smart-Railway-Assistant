import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function AdminDashboard() {
  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response =
        await axios.get(
          "https://railgpt-backend.onrender.com/users"
        );

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 5 }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          mb: 4,
          color: "#240046",
        }}
      >
        Admin Dashboard
      </Typography>
<Typography
  sx={{
    mb: 4,
    color: "gray",
  }}
>
  Manage registered users and monitor system activity.
</Typography>
      <Paper elevation={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>

                <TableCell>
                  <b>Name</b>
                </TableCell>

                <TableCell>
                  <b>Email</b>
                </TableCell>

                <TableCell>
                  <b>Mobile</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map(
                (user) => (
                  <TableRow
                    key={user.id}
                  >
                    <TableCell>
                      {user.id}
                    </TableCell>

                    <TableCell>
                      {user.name}
                    </TableCell>

                    <TableCell>
                      {user.email}
                    </TableCell>

                    <TableCell>
                      {user.mobile}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default AdminDashboard;