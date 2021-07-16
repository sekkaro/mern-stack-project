import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const PasswordResetForm = ({ onChange, email, onSubmit, switchForm }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-info text-center">Reset Password</h1>
          <hr />
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter Email"
                required
              />
            </Form.Group>

            <Button type="submit">Reset Password</Button>
          </Form>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col>
          <a href="#!" onClick={() => switchForm("login")}>
            Login now
          </a>
        </Col>
      </Row>
    </Container>
  );
};

PasswordResetForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  switchForm: PropTypes.func.isRequired,
};

export default PasswordResetForm;
