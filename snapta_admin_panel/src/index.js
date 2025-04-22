// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter,Routes,Route} from 'react-router-dom'
// import Sidebar from "./pages/Sidebar/Sidebar"
// import Home from './pages/Home/home'

// export default function App() {
//   return(
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}/>
//         <Route index element={<Home />}/>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );



// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/slice/store.ts";
import { Provider } from 'react-redux'
import './css/Colors.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>

);

reportWebVitals();

