import "./App.css";
import DefaultLayout from "./layout/DefaultLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Entry from "./pages/entry/Entry";

function App() {
  return (
    <div className="App">
      {/* <Entry /> */}
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </div>
  );
}

export default App;
