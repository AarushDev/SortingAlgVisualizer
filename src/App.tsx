import "./App.css";
import SortingPage from "./Components/SortingPage";
import Sidebar from "./Components/Sidebar";
import AppSettingsContextProvider from "./Contexts/AppSettingsContext";

function App() {
  return (
    <div className="h-screen flex bg-lighBackground text-textPrimary">
      <AppSettingsContextProvider>
        <Sidebar />
        <SortingPage />
      </AppSettingsContextProvider>
    </div>
  );
}

export default App;
