import { Button } from "antd";
import styledComponents from "styled-components";
import { colors } from "../../utilities/colors";

export const TealButton = styledComponents(Button)`
    margin-top: 16px;
    background-color: ${(props) =>
      props.disabled ? colors.disabled : colors.mosque};
    color: white;
    box-shadow: 0px 2px 3px 0px rgb(0 0 0 / 0.25);
    font-weight: bold;
    border-radius: 5px;
    height: 50px;
    border: none;
    :focus,:hover{
        cursor: pointer;
        background-color:  ${(props) =>
          props.disabled ? colors.disabled : colors.mosque};
        color: white;
        box-shadow: 0px 4px 6px 0px rgb(0 0 0 / 0.4);
    }
    :active{
        cursor: pointer;
        background-color:  ${(props) =>
          props.disabled ? colors.disabled : colors.cyprus};
        color: white;
        box-shadow: 0px 4px 6px 0px rgb(0 0 0 / 0.4);
    }
    :disabled{
        cursor: not-allowed !important;
        background-color: ${colors.disabled} !important;
        color: white !important;
    }  

    :not([disabled]):active{
        cursor: pointer;
        background-color:  ${(props) =>
          props.disabled ? colors.disabled : colors.cyprus};
        color: white;
        box-shadow: 0px 4px 6px 0px rgb(0 0 0 / 0.4);
    }
 
    
`;
