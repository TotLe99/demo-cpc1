import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import Dashboard from "./component/Dashboard";

function App() {
    return (
        <>
          <Routes>
            <Route path={''} element={<Dashboard/>}></Route>
          </Routes>
        </>
    );
}

export default App;
