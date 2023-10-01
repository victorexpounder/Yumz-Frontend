import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
