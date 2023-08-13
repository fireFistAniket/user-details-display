import { useState } from "react";
import MainScreen from "./screens/MainScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MainScreen />
    </>
  );
}

export default App;
