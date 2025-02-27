import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
function App() {
  const [searchText, setSearchText]= useState("");

  function handleSearch(newSearchText){
    setSearchText(newSearchText);
  }
  return (
    <>
      <Header searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch}/>
      <Outlet context={{searchText}}/> 
    </>
  )
}

export default App
