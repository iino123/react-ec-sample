import React from "react";
import { CustomButtonContainer } from "./custom-button.styles";

// NOTE: styled-componentのカスタムタグにhtml属性を与えると反映される(type='submit'など)
// 今回の場合は...propsの部分にhtmlタグやstyled-componentに渡したい変数が格納される可能性があるが正常に処理される
const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
