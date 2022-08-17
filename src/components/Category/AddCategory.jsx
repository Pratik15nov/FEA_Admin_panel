import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
export default function AddCategory() {
  const [files, setFiles] = useState([]);
  console.log(files)
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h1">Add Category </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Box underline="hover" color="inherit">
            Category
          </Box>
          <Typography>Category List</Typography>
          <Typography color="text.primary">Add </Typography>
        </Breadcrumbs>
      </Box>
      <Typography color="text.primary" sx={{ padding: 2 }}>
        Add your Product category and necessary information from here
      </Typography>
      <Box
        component="form"
        sx={{
          padding: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            width: "40%",
            boxShadow: `rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px`,
            padding: 2,
            borderRadius: 2,
          }}
        >
         <Typography color="text.primary" variant="caption" display="block">
            Category name
          </Typography>
          <TextField />

          <Typography color="text.primary" variant="caption" display="block">
            Category Images
          </Typography>

          <FilePond
            files={files}
            allowReorder={true}
            allowMultiple={true}
            onupdatefiles={setFiles}
            labelIdle='Drag & Drop your Images<span class="filepond--label-action">Browse</span>'
          />
          <Button variant="contained">Add Category</Button>
        </Box>
      </Box>
    </Box>
  );
}
