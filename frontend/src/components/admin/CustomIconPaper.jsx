import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import { useTheme } from "@mui/material";

const CustomIconPaper = ({ icon, children, hideLine }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative', // Relative position for the icon to be absolute within
      }}
    >
      {/* Vertical Line */}
      
      { !hideLine && 
        <Box
          sx={{
            position: 'absolute',
            top: '-80px', // Adjust based on the desired length of the line
            left: 50, // Center align with the IconButton
            height: '80px', // Height of the line
            width: '2px', // Width of the line
            bgcolor: 'primary.main', // Line color
            transform: 'translateX(-50%)', // Center the line horizontally
          }}
        />
      }
      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          left: 50,
          backgroundColor: theme.palette.primary.main,
          color: "#ffffff",
          transform: 'translate(-50%, -50%)', // Adjust the position as needed
          // Add additional styling if needed
        }}>
        {icon}
      </IconButton>
      {children}
    </Box>
  )
}

export default CustomIconPaper