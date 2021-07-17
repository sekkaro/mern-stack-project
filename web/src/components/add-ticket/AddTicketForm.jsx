import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import "./addTicketForm.css";

const AddTicketForm = ({ onSubmit, onChange, formData, formErrorData }) => {
  return (
    <Jumbotron className="add-new-ticket mt-3 bg-light">
      <h1 className="text-info text-center">Add New Ticket</h1>
      <hr />
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Subject
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="subject"
              value={formData.subject}
              onChange={onChange}
              placeholder="Subject"
              required
              minLength="3"
              maxLength="100"
            />
            <Form.Text className="text-danger">
              {formErrorData.subject && "Subject is required"}
            </Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Issue Found
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={onChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            name="detail"
            value={formData.detail}
            onChange={onChange}
            rows="5"
            required
          />
        </Form.Group>

        <Button type="submit" block variant="info">
          Login
        </Button>
      </Form>
    </Jumbotron>
  );
};

AddTicketForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  formErrorData: PropTypes.object.isRequired,
};

export default AddTicketForm;
