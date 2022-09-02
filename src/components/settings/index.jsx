import BreadcrumbArea from "../BreadcrumbArea";
import { Container } from "./settings.style";
//
import { Button } from "@mui/material";
import { loginCheck, afterLoginCheck } from "../../service/Auth.Service";

const Settings = () => {
  const handleLogin = async () => {
    const body = {
      email: "vanshpanchal132@gmail.com",
      password: "V@nsh1316",
    };
    try {
      const response = await loginCheck(body);
      if (response) {
        console.log(response?.data?.token);
        localStorage.setItem(
          "dataToken", response?.data?.token
        );
        console.log("STORED");
      } else {
        alert("not working");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleCheck = async () => {
    const body = {
      Status: "RESONSE CHECK WORKS",
    };
    try {
      const response = await afterLoginCheck(body);
      if (response) {
        console.log(response);
      } else {
        alert("not working");
      }
    } catch (error) {
      alert(error);
    }
  };

  // const handleCheck = () => {
  //   console.log("TOKEN FORM CHECK",localStorage.getItem("dataToken"));
  // };

  return (
    <>
      <Container>
        <BreadcrumbArea />
      </Container>
      <Button variant="outlined" size="large" onClick={handleLogin}>
        LOGIN
      </Button>

      <Button variant="outlined" size="large" onClick={handleCheck}>
        CHECK
      </Button>
    </>
  );
};

export default Settings;
