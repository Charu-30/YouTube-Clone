import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
function App() {
  const [searchText, setSearchText]= useState("");
  const [isSidebarOpen, setIsSidebarOpen]= useState(false);

  function handleSearch(newSearchText){
    setSearchText(newSearchText);
  }
  return (
    <>
      <Header 
        searchText={searchText} 
        setSearchText={setSearchText} 
        handleSearch={handleSearch}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar isOpen={isSidebarOpen}/>
      <div className={`transition-all duration-300 ${isSidebarOpen? "ml-64":"ml-24"}`}>
          <Outlet context={{searchText}}/> 
      </div>
      
    </>
  )
}

export default App
