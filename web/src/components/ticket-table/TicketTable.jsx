import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TicketTable = ({ tickets }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Subject</th>
          <th>Status</th>
          <th>Opened Date</th>
        </tr>
      </thead>
      <tbody>
        {tickets.length ? (
          tickets.map((ticket, idx) => (
            <tr key={ticket.id}>
              <td>{idx + 1}</td>
              <td>
                <Link to={`/ticket/${ticket.id}`}>{ticket.subject}</Link>
              </td>
              <td>{ticket.status}</td>
              <td>{ticket.addedAt}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No ticket to show
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

TicketTable.propTypes = {
  tickets: PropTypes.array.isRequired,
};

export default TicketTable;
