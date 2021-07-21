import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import tickets from "../../assets/data/dummy-tickets.json";
import PageBreadcrumb from "../../components/breadcrumb/PageBreadcrumb";
import SearchForm from "../../components/search-form/SearchForm";
import TicketTable from "../../components/ticket-table/TicketTable";
import { fetchAllTickets } from "./ticketsAction";

const TicketList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);
  // const [keyword, setKeyword] = useState("");
  // const [displayTickets, setDisplayTickets] = useState(tickets);

  // useEffect(() => {
  //   setDisplayTickets(tickets);
  // }, [tickets]);

  // const onChangeHandler = (e) => {
  //   const { value } = e.target;
  //   setKeyword(value);
  //   searchTicket(value);
  // };

  // const searchTicket = (keyword) => {
  //   const displayTickets = tickets.filter((ticket) =>
  //     ticket.subject.toLowerCase().includes(keyword.toLowerCase())
  //   );

  //   setDisplayTickets(displayTickets);
  // };
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
          <SearchForm />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <TicketTable />
        </Col>
      </Row>
    </Container>
  );
};

export default TicketList;
