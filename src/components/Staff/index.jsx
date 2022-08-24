import { Box } from "@mui/material";
import BreadcrumbArea from "../BreadcrumbArea";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { articles: state.articles };
};

const ConnectedList = (props) => {
  return (
    <Box>
      <BreadcrumbArea />
      <ul>
        {props.articles?.map((el) => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </Box>
  );
};

const Staff = connect(mapStateToProps)(ConnectedList);

export default Staff;
