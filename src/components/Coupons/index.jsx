import BreadcrumbArea from "../BreadcrumbArea";
import { useState } from "react";
import { connect } from "react-redux";
import { addArticle } from "../../js/actions";
import { Container } from "./Coupons.style";

const mapDispatchToProps = (dispatch) => {
  return {
    addArticle: (article) => dispatch(addArticle(article)),
  };
};

const ConnectedForm = () => {
  const [title, setTitle] = useState("");
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addArticle(title);
    setTitle(" ");
  };
  return (
    <Container>
      <BreadcrumbArea />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={handleChange} />
        </div>
        <button type="submit">SAVE</button>
      </form>
    </Container>
  );
};

const Coupons = connect(null, mapDispatchToProps)(ConnectedForm);

export default Coupons;
