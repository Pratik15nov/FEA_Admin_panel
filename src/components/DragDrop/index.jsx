import React from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FormText } from "../Products/Products.style";

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
        <CloudUploadIcon />
        {isDragActive ? (
          <FormText display="block" gutterBottom>
            Release to drop the files here
          </FormText>
        ) : (
          <FormText display="block" gutterBottom>
            Drag your image here
          </FormText>
        )}
      </Box>
    </Box>
  );
}
