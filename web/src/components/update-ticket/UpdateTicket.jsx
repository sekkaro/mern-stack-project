import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const UpdateTicket = ({ msg, onChange, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Label>Reply</Form.Label>
      <Form.Text>Please reply here or update the ticket</Form.Text>
      <Form.Control
        as="textarea"
        row="5"
        name="detail"
        value={msg}
        onChange={onChange}
      />
      <div className="text-right mt-3 mb-3">
        <Button variant="info" type="submit">
          Reply
        </Button>
      </div>
    </Form>
  );
};

UpdateTicket.propTypes = {
  msg: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdateTicket;
