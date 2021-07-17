import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import AddTicketForm from "../../components/add-ticket/AddTicketForm";
import PageBreadcrumb from "../../components/breadcrumb/PageBreadcrumb";
import { shortText } from "../../utils/validation";

const initialFormData = {
  subject: "",
  issueDate: "",
  detail: "",
};

const initialFormErrorData = {
  subject: false,
  issueDate: false,
  detail: false,
};

const AddTicket = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errorData, setErrorData] = useState(initialFormErrorData);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setErrorData(initialFormErrorData);

    const isSubjectValid = shortText(formData.subject);

    setErrorData((data) => {
      return {
        ...data,
        subject: !isSubjectValid,
      };
    });

    console.log(formData);
  };

  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page="Add Ticket" />
        </Col>
      </Row>
      <Row>
        <Col>
          <AddTicketForm
            onChange={onChangeHandler}
            onSubmit={onSubmitHandler}
            formData={formData}
            formErrorData={errorData}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AddTicket;
