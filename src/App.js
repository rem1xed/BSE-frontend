import React from "react";
import Header from "./components/molecules/Header";
import "./styles/Header.css";

function App() {
  return (
    <div>
      <Header />
      <main style={{ margin: "30px" }}>
        {/* Тут буде основний вміст */}
      </main>
    </div>
  );
}

export default App;