import { BrowserRouter } from "react-router";
import MainRouter from "./routes";

function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
