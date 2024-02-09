import React, { useEffect, useState } from "react";
import api from "../../state/api/api";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Navigation from "./Navigation";
import { BASE_URL } from "../../config";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import ActionMenu from "./ActionMenu";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "scroll",
  height: "100%",
  display: "block",
  width: 1050,
};
function ChildModal({
  username,
  password,
  phone_no,
  security_word,
  report_provider,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} variant="contained">
        View Provider Credentials
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 250 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Provider's Details
          </Typography>
          <div>
            <div style={{ display: "flex", marginTop: "8px" }}>
              <h4 style={{ fontWeight: "bold", marginRight: "5px" }}>
                Username:
              </h4>
              <p>{username}</p>
            </div>
            <div style={{ display: "flex" }}>
              <h4 style={{ fontWeight: "bold", marginRight: "5px" }}>
                password:
              </h4>
              <p>{password}</p>
            </div>
            <div style={{ display: "flex" }}>
              <h4 style={{ fontWeight: "bold", marginRight: "5px" }}>
                phone_no:
              </h4>
              <p>{phone_no}</p>
            </div>
            <div style={{ display: "flex" }}>
              <h4 style={{ fontWeight: "bold", marginRight: "5px" }}>
                security_word:
              </h4>
              <p>{security_word}</p>
            </div>
            <div style={{ display: "flex" }}>
              <h4 style={{ fontWeight: "bold", marginRight: "5px" }}>
                report_provider:
              </h4>
              <p>{report_provider}</p>
            </div>
          </div>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState({});
  const [docs, setDocs] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [editing, setEditing] = useState();
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [fileLoc, setFileLoc] = useState("strlink");
  const [modalOpenImage, setModalOpenImage] = useState(false);

  const handleOPenImage = () => setModalOpenImage(true);
  const handleCloseImage = () => setModalOpenImage(false);
  const doc = [
    { uri: `${BASE_URL}/${fileLoc}` }, // Remote file
  ];

  console.log(providers);

  // seach users
  const [searchQuery, setSearchQuery] = useState(""); // Step 1
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const url = BASE_URL + "/user";
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUsers(data);
        setFetchError(false);
      })
      .catch((err) => {
        setLoading(false);
        setFetchError(true);
        console.log(err);
      });
  }, [editing]);

  const showModal = async (email) => {
    try {
      const docs = await api.get(`/docs/${email}`);
      const providers = await api.get(`/provider/${email}`);
      setDocs(docs.data);
      setProviders(providers.data[0]);
      handleOpen();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async (id) => {
    try {
      await api.put(`/user/${id}`, { password: updatedPassword });
      setEditing("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditing = (id) => {
    setEditing(id);
  };
  const handleDelete = async (id, first_name, last_name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete user ${first_name} ${last_name}?`
    );

    if (confirmed) {
      await api.delete(`/user/${id}`);
      setEditing("");
    }
  };

  return (
    <Navigation>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Data
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            {docs !== null ? (
              <>
                <Box>
                  <FormControlLabel
                    control={<Checkbox checked={docs.credit} />}
                    label="Credit"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.creditstrong} />}
                    label="Creditstrong"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.boompay} />}
                    label="Boompay"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.checksystems} />}
                    label="Checksystems"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.clarityservices} />}
                    label="Clarityservices"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.consumer_office_freeze} />}
                    label="Consumer Office Freeze"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.experian} />}
                    label="Experian"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.innovice} />}
                    label="Innovice"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.kikoff} />}
                    label="Kikoff"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.lexis_nexis_freeze} />}
                    label="Lexis Nexis Freeze"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.sagestreamilc} />}
                    label="Sagestreamilc"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.self} />}
                    label="Self"
                  />

                  <FormControlLabel
                    control={<Checkbox checked={docs.teletrack_freeze} />}
                    label="Teletrack Freeze"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={docs.user_agreement_freeze} />}
                    label="User Agreement Freeze"
                  />
                </Box>
                <Box>
                  {docs.photo_ID !== "photo" && (
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2, cursor: "pointer" }}
                    >
                      <Link
                        onClick={() => {
                          setFileLoc(docs.photo_ID);
                          handleOPenImage();
                        }}
                      >
                        Photo ID
                      </Link>
                    </Typography>
                  )}

                  {docs.proof_of_address !== "photo" && (
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2, cursor: "pointer" }}
                    >
                      <Link
                        onClick={() => {
                          setFileLoc(docs.proof_of_address);
                          handleOPenImage();
                        }}
                      >
                        Proof of Address
                      </Link>
                    </Typography>
                  )}
                </Box>
              </>
            ) : (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  No Information provided by this user
                </Typography>
              </>
            )}
          </Box>
          {providers !== undefined ? (
            <ChildModal
              username={providers.username}
              password={providers.password}
              phone_no={providers.phone_no}
              security_word={providers.security_word}
              report_provider={providers.report_provider}
            />
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                No Provider credentials provided by this user
              </Typography>
            </>
          )}
        </Box>
      </Modal>

      <Box sx={{ display: "flex", justifyContent: "space-between"}}>
        <Stack direction="row" spacing={1}>
          <Chip sx={{borderRadius: "-20px"}} label="ACTIVE" color="primary" icon={"12"} variant="outlined" />
          <Chip label="INACTIVE" color="error" variant="outlined" />
        </Stack>

        <Stack direction="row" spacing={1}>
          <TextField 
            size="small" 
            label="Search by name"
            variant="outlined" 
            value={searchQuery} // Bind searchQuery state to the TextField
            onChange={handleSearchChange} // Update searchQuery on change
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained">Add Users</Button>
        </Stack>
      </Box>
     

      <Paper sx={{marginTop: "10px", width: '100%', overflow: 'hidden'}}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "whitesmoke" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zip Code</TableCell>
                <TableCell>SS Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={7}>Loading...</TableCell>
                </TableRow>
              )}
              {fetchError && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ color: "red" }}>
                    Error! could not fetch users
                  </TableCell>
                </TableRow>
              )}
              {filteredUsers?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                    onClick={() => showModal(user.email)}
                  >{`${user.first_name} ${user.last_name}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {editing === user.id ? (
                      <div>
                        <input
                          style={{
                            border: "1px solid #ccc",
                            padding: "3px",
                            outline: "none",
                          }}
                          type="password"
                          value={updatedPassword}
                          onChange={(e) => setUpdatedPassword(e.target.value)}
                        />
                        <button onClick={() => handleSave(user.id)}>
                          <SaveIcon color="success" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        {user.password}
                        <button onClick={() => handleEditing(user.id)}>
                          <EditIcon color="warning" />
                        </button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>{user.zip_code}</TableCell>
                  <TableCell>{user.ss_number}</TableCell>
                  {/* <TableCell>
                    <button
                      onClick={() =>
                        handleDelete(user.id, user.first_name, user.last_name)
                      }
                    >
                      <DeleteIcon color="error" />
                    </button>
                  </TableCell> */}
                  <ActionMenu onDelete={() => handleDelete(user.id, user.first_name, user.last_name)} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal open={modalOpenImage} onClose={handleCloseImage} const>
        <Box sx={modalStyle}>
          <div id="editor-contaner">
            <div className="editor">
              <DocViewer
                documents={doc}
                initialActiveDocument={doc[1]}
                pluginRenderers={DocViewerRenderers}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </Navigation>
  );
};

export default UsersList;
