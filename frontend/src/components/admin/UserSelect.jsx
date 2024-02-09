import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, Button, Stack } from "@mui/material";
import AddUserModal from "./AddUserModal";
import { BASE_URL } from "../../config";

const UsersSelect = ({ value, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  useEffect(() => {
    const url = BASE_URL + "/user";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        // alert('Error: Could not fetch list of users');
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Stack direction={"row"} alignItems="center" spacing={2}>
        <Autocomplete
          fullWidth
          disablePortal
          id="combo-box-demo"
          options={users}
          getOptionLabel={(option) =>
            `${option["first_name"]} ${option["last_name"]}`
          }
          // size="small"
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {`${option.first_name} ${option.last_name}`}
            </li>
          )}
          sx={{ mb: 2, marginTop: "12px" }}
          renderInput={(params) => <TextField {...params} label="Users" />}
          value={value}
          onChange={(e, newValue) => {
            setSelectedUser(newValue);
          }}
        />
        {/* <Button variant="contained" color="primary" onClick={handleModalOpen}> Add User</Button> */}
      </Stack>

      <>{/* <AddUserModal open={open} handleClose={handleModalClose} /> */}</>
    </div>
  );
};

export default UsersSelect;
