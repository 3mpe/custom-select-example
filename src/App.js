import { useState } from "react";
import "./App.css";
import Select from "./components/Select";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectionChange = (newSelection) => {
    console.log("Selected Items:", newSelection);
    setSelectedItems(selectedItems, newSelection);
  };

  return (
    <div className="App">
      <Select
        options={["Option 1", "Option 2", "Option 3"]}
        onChange={handleSelectionChange}
      />
    </div>
  );
}

export default App;
