import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterSearchTicket } from "../../pages/ticket-list/ticketsAction";

const SearchForm = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(filterSearchTicket(keyword));
  }, [dispatch, keyword]);

  const onChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

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

export default SearchForm;
