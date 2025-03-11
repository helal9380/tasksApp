import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import TaskList from "./components/TaskList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white">
        <SideBar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TaskList searchTerm={searchTerm} />
        </main>
      </div>
    </>
  );
}

export default App;
