import React from "react";
import styled from "styled-components";

//기본: 남색버튼, is_white: 하얀색버튼

const Button = (props) => {
  const {
    type,
    width,
    margin,
    padding,
    fontSize,
    border,
    bg,
    textAlign,
    color,
    disabled,
    _onClick,
    children,
  } = props;
  const styles = {
    type: type,
    width: width,
    margin: margin,
    padding: padding,
    fontSize: fontSize,
    textAlign: textAlign,
    color: color,
    bg: bg,
    border: border,
    disabled: disabled,
  };

  if (type === "white") {
    return (
      <WhiteButton disabled={disabled} {...styles} onClick={_onClick}>
        {children}
      </WhiteButton>
    );
  }
  if (type === "blue") {
    return (
      <BlueButton disabled={disabled} {...styles} onClick={_onClick}>
        {children}
      </BlueButton>
    );
  }
  return (
    <DefaultButton disabled={disabled} {...styles} onClick={_onClick}>
      {children}
    </DefaultButton>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
  width: "100%",
  bg: "transparent",
  color: "black",
  margin: 0,
  padding: 0,
  border: "none",
  textAlign: "left",
  is_white: false,
  disable: false,
};

const WhiteButton = styled.button`
  width: ${(props) => props.width};
  background-color: #fff;
  color: #243443;
  padding: 12px 0px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #243443;
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) =>
    props.disabled
      ? `background-color: #e9ecef; color:#ced4da; border:1px solid #ced4da`
      : ""};
  &:hover {
    cursor: pointer;
  }
`;

const BlueButton = styled.button`
  width: ${(props) => props.width};
  background-color: #243443;
  color: #fff;
  padding: 12px 0px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #243443;
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) =>
    props.disabled
      ? `background-color: #e9ecef; color:#ced4da; border:1px solid #ced4da`
      : ""};
  &:hover {
    cursor: ${(props) => (!props.disabled ? "pointer" : "not-allowed")};
  }
`;

const DefaultButton = styled.button`
  width: auto;
  text-align: left;
  ${(props) => props.margin && `margin: ${props.margin}`};
  ${(props) => props.padding && `padding: ${props.padding}`};
  ${(props) => props.color && `color: ${props.color}`};
  ${(props) => props.fontSize && `font-size: ${props.fontSize}`};
  ${(props) => props.textAlign && `text-align: ${props.textAlign}`};
  ${(props) => props.border && `border: ${props.border}`};
  ${(props) => props.bg && `background-color: ${props.bg}`};
  ${(props) =>
    props.disabled
      ? `background-color: #e9ecef; color:#ced4da; border:1px solid #ced4da`
      : ""};
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
