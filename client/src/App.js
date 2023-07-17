import React from "react";
import './App.css';
import MyBook from './components/Hero';

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import 'font-awesome/css/font-awesome.min.css';

// import './components/style.css'; // Add this line to import the style.css file

import Homepage from'./pages/Homepage';


function App() {
  return (
     <MyBook/>,
     <Homepage/>
    //  <Routes>
    //         <Route path="/" element={<Home />} />
    //         </Routes>
    

  );
}

export default App;
