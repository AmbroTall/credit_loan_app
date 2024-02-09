import React, { useEffect, useState } from "react";

import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Navigation from "./Navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RichTextModal from "./RichTextModal";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { BASE_URL } from "../../config";

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
const DisputesPage = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [content, setContent] = useState("");
  const [fileLoc, setFileLoc] = useState("strlink");

  const docs = [
    { uri: `${BASE_URL}/${fileLoc}` }, // Remote file
  ];

  const [modalOpen, setModalOpen] = useState(false);

  const handleOPen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const [modalOpenImage, setModalOpenImage] = useState(false);

  const handleOPenImage = () => setModalOpenImage(true);
  const handleCloseImage = () => setModalOpenImage(false);

  console.log(content);

  useEffect(() => {
    const url = BASE_URL + "/dispute";
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setError(false);
        setDisputes(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <Navigation>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1050 }}>
            <TableHead sx={{ backgroundColor: "whitesmoke" }}>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Credit Furnisher</TableCell>
                <TableCell>instruction</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Equifax</TableCell>
                <TableCell>Experian</TableCell>
                <TableCell>TransUnion</TableCell>
                <TableCell>Letter Name</TableCell>
                <TableCell>Equifax Letter</TableCell>
                <TableCell>Experian Letter</TableCell>
                <TableCell>TransUnion Letter</TableCell>
                <TableCell>Equifax Report</TableCell>
                <TableCell>Experian Report</TableCell>
                <TableCell>TransUnion Report</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={12}>Loading...</TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={12}>
                    Error! Could not fetch disputes
                  </TableCell>
                </TableRow>
              )}
              {React.Children.toArray(
                disputes?.map((dispute) => (
                  <TableRow>
                    <TableCell>{dispute.email}</TableCell>
                    <TableCell>{dispute.reason}</TableCell>
                    <TableCell>{dispute.credit_furnisher}</TableCell>
                    <TableCell>{dispute.instruction}</TableCell>
                    <TableCell>
                      {dispute.account_number
                        ? dispute.account_number
                        : `equifax: ${
                            dispute.equifax_account
                              ? dispute.equifax_account
                              : ""
                          }, equifax: ${
                            dispute.experian_account
                              ? dispute.experian_account
                              : ""
                          }, Trans union: ${
                            dispute.transUnion_account
                              ? dispute.transUnion_account
                              : ""
                          },`}
                    </TableCell>
                    <TableCell>
                      {dispute.equifax ? (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      ) : (
                        <CancelIcon sx={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell>
                      {dispute.experian ? (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      ) : (
                        <CancelIcon sx={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell>
                      {dispute.trans_union ? (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      ) : (
                        <CancelIcon sx={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell>{dispute.letter_name}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          if (dispute.equifax_letter) {
                            setContent(dispute.equifax_letter);
                          } else {
                            setContent("");
                          }
                          handleOPen();
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          if (dispute.experian_letter) {
                            setContent(dispute.experian_letter);
                          } else {
                            setContent("");
                          }
                          handleOPen();
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          if (dispute.trans_union_letter) {
                            setContent(dispute.trans_union_letter);
                          } else {
                            setContent("");
                          }
                          handleOPen();
                        }}
                      >
                        View
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() => {
                          setFileLoc(dispute.equifax_report);
                          handleOPenImage();
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setFileLoc(dispute.experian_report);
                          handleOPenImage();
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setFileLoc(dispute.transUnion_report);
                          handleOPenImage();
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Navigation>
      <>
        <RichTextModal
          open={modalOpen}
          handleClose={handleClose}
          content={content}
        />
      </>

      <Modal open={modalOpenImage} onClose={handleCloseImage} const>
        <Box sx={modalStyle}>
          <div id="editor-contaner">
            <div className="editor">
              <DocViewer
                documents={docs}
                initialActiveDocument={docs[1]}
                pluginRenderers={DocViewerRenderers}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DisputesPage;
