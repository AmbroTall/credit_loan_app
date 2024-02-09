import React, { useEffect } from 'react';
import { csv } from '../../letters-data';
import Papa from 'papaparse';
import { Autocomplete, Box, Button, TextField, Paper, Typography } from '@mui/material';
import CustomIconPaper from './CustomIconPaper';
import { BsCcCircle } from "react-icons/bs";


const LetterSelect = ({ value, setSelectedLetter }) => {
    const [templates, setTemplates] = React.useState([]);

    useEffect(() => {
        Papa.parse(csv, {
            header: true,
            complete: function (results) {
                setTemplates(results.data);
            },
        });
    }, []);

    return (
        <CustomIconPaper icon={<BsCcCircle />}>
            <Paper
                sx={{
                    mt: 10,
                    padding: 5,
                    // border: '1px solid black',
                }}
            >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 2
                  }}
                >
                  <Typography variant="h5"> Select The Subject Of Mail</Typography>
                </Box>

                <Autocomplete
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    options={templates}
                    getOptionLabel={option => option['Category Name']}
                    renderOption={(props, option) =>
                        React.Children.toArray(
                            <li {...props}>{option['Category Name']}</li>
                        )
                    }
                    // sx={{ mb: 2 }}
                    renderInput={params => (
                        <TextField {...params} label="Letters" />
                    )}
                    // size={'small'}
                    value={value}
                    onChange={(e, newValue) => {
                        console.log(newValue);
                        setSelectedLetter(newValue);
                    }}
                />
                <Box sx={{display: "flex", justifyContent: "center"}} mt={3}>
                    <Button variant="contained" color="primary">
                        Next
                    </Button>
                </Box>
            </Paper>
        </CustomIconPaper>
    );
};

export default LetterSelect;
