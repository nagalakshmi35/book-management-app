import React from "react";
import { useNavigate } from "react-router-dom";

// HOC to pass navigate as a prop
const withNavigation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigation