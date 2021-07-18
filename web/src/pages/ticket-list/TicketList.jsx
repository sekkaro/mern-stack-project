import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PageBreadcrumb from "../../components/breadcrumb/PageBreadcrumb";
import SearchForm from "../../components/search-form/SearchForm";
import TicketTable from "../../components/ticket-table/TicketTable";
import tickets from "../../assets/data/dummy-tickets.json";
import { Link } from "react-router-dom";

const TicketList = () => {
  const [keyword, setKeyword] = useState("");
  const [displayTickets, setDisplayTickets] = useState(tickets);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setKeyword(value);
    searchTicket(value);
  };

  const searchTicket = (keyword) => {
    const displayTickets = tickets.filter((ticket) =>
      ticket.subject.toLowerCase().includes(keyword.toLowerCase())
    );

    setDisplayTickets(displayTickets);
  };
  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page="Ticket List" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Link to="/add-ticket">
            <Button variant="info">Add New Ticket</Button>
          </Link>
        </Col>
        <Col className="text-right">
          <SearchForm onChange={onChangeHandler} keyword={keyword} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <TicketTable tickets={displayTickets} />
        </Col>
      </Row>
    </Container>
  );
};

export default TicketList;
