import React from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function DragDrop({ onDrop, accept, open }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
  });

  return (
    <Box
      component="span"
      sx={{ p: 5 }}
      {...getRootProps({ className: "dropzone" })}
    >
      <input {...getInputProps()} />
      <Box>
      <CloudUploadIcon/>
        {isDragActive ? (
          <Typography display="block" gutterBottom>
            Release to drop the files here
          </Typography>
        ) : (
          <Typography display="block" gutterBottom>
            Drag your image here
          </Typography>
        )}
      </Box>
    </Box>
  );
}
