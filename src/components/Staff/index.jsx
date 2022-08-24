import BreadcrumbArea from "../BreadcrumbArea";
import { connect } from "react-redux";
import { Container } from "./Staff.style";

const mapStateToProps = (state) => {
  return { articles: state.articles };
};

const ConnectedList = (props) => {
  return (
    <Container>
      <BreadcrumbArea />
      <ul>
        {props.articles?.map((el) => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </Container>
  );
};

const Staff = connect(mapStateToProps)(ConnectedList);

export default Staff;
