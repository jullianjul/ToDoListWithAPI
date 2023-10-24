import React from "react";
import { useDarkMode } from "../Modals/DarkModeContext";
import { useNavigate } from "react-router-dom";

export const Li = (props,param) => {
  const { darkmode } = useDarkMode();
  const navigate = useNavigate();
  function handleClick() {
    navigate(props.link);
  }
  return (
    <li className={props.className} onClick={handleClick}><a  className={darkmode?'Navs_adark':"Navs_a"}>{props.content}</a></li>
  )
}
