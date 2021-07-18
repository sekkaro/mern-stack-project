import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Ticket from "./pages/ticket/Ticket";
import Dashboard from "./pages/dashboard/Dashboard";
import AddTicket from "./pages/add-ticket/AddTicket";
import TicketList from "./pages/ticket-list/TicketList";
import Entry from "./pages/entry/Entry";
import PrivateRoute from "./components/private-route/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Entry />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/add-ticket">
            <AddTicket />
          </PrivateRoute>
          <PrivateRoute path="/tickets">
            <TicketList />
          </PrivateRoute>
          <PrivateRoute path="/ticket/:tid">
            <Ticket />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
