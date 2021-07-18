import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PageBreadcrumb from "../../components/breadcrumb/PageBreadcrumb";
import tickets from "../../assets/data/dummy-tickets.json";
import MessageHistory from "../../components/message-history/MessageHistory";
import UpdateTicket from "../../components/update-ticket/UpdateTicket";
import { useParams } from "react-router-dom";

const Ticket = () => {
  const { tid } = useParams();
  const [message, setMessage] = useState("");
  const [ticket, setTicket] = useState();

  useEffect(() => {
    const newTicket = tickets.find((ticket) => ticket.id === parseInt(tid));
    setTicket(newTicket);
  }, [tid]);

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(message);
  };

  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page="Ticket" />
        </Col>
      </Row>
      <Row>
        <Col className="font-weight-bolder text-secondary">
          <div className="subject">Subject: {ticket?.subject}</div>
          <div className="date">Ticket Opened: {ticket?.addedAt}</div>
          <div className="status">Status: {ticket?.status}</div>
        </Col>
        <Col className="text-right">
          <Button variant="outline-info">Close Ticket</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {ticket?.history && <MessageHistory messages={ticket.history} />}
        </Col>
      </Row>
      <hr />
      <Row className="mt-4">
        <Col>
          <UpdateTicket
            msg={message}
            onChange={onChangeHandler}
            onSubmit={onSubmitHandler}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Ticket;
