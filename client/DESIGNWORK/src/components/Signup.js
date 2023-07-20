import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const Signup = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
};

export default Signup;