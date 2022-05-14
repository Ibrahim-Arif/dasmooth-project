import { Button } from "antd";
import styledComponents from "styled-components";
import { colors } from "../../utilities/colors";

export const TealButton = styledComponents(Button)`
    margin-top: 16px;
    background-color: ${colors.teal100};
    color: white;
    font-weight: bold;
    height: 50px;
    :focus,:hover {
        color: white;
        border-color:${colors.teal100};
        background: ${colors.teal100};
    }

`;
