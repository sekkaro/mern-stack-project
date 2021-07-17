import { Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchForm = ({ onChange, keyword }) => {
  return (
    <div>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Search:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              name="keyword"
              onChange={onChange}
              value={keyword}
              placeholder="Search..."
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default SearchForm;
