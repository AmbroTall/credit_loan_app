import React from 'react';
import { Button, Typography, TextField } from '@mui/material';
import Box from '@mui/material/Box';


function FileInput({ onChange, name }) {
  const [fileName, setFileName] = React.useState('');

  const handleFileChange = (event) => {
    setFileName(event.target.files[0].name);
    onChange(event);
  };

  return (
    <Box sx={{backgroundColor: "#f6f7f57a", padding: 2, borderRadius: 3, mb: 1.5}}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {name}
        </Typography>

        <Box sx={{ display: "flex", gap: "15px"}}>
            <Button
                variant="contained"
                component="label"
                // sx={{ marginRight: 2 }}
            >
                Choose file
                <input
                type="file"
                hidden
                onChange={handleFileChange}
                />
            </Button>

            <TextField
                variant="outlined"
                disabled
                value={fileName}
                placeholder="No file chosen to upload"
                size="small"
                // fullWidth
                sx={{ width: '85%' }}
            />
        </Box>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Supported files are .PNG, .JPG & .PDF
        </Typography>
    </Box>
  );
}

export default FileInput;