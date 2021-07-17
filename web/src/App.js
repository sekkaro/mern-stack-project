import "./App.css";
import DefaultLayout from "./layout/DefaultLayout";
import AddTicket from "./pages/add-ticket/AddTicket";
import Dashboard from "./pages/dashboard/Dashboard";
import Entry from "./pages/entry/Entry";

function App() {
  return (
    <div className="App">
      {/* <Entry /> */}
      <DefaultLayout>
        {/* <Dashboard /> */}
        <AddTicket />
      </DefaultLayout>
    </div>
  );
}

export default App;
