import PropTypes from "prop-types";
import styled from "styled-components";
import { forwardRef } from "react";

export const InputContainer = forwardRef(
	({ className, width, ...props }, ref) => {
		return <input className={className} {...props} ref={ref}></input>;
	},
);
export const Input = styled(InputContainer)`
	height: 35px;
	margin: 0 0 10px;
	padding: 10px;
	border: 1px solid #000;
	font-size: 16px;
	width: ${({ width = "100%" }) => width};
	box-sizing: border-box;
`;

Input.propTypes = {
	width: PropTypes.string,
};
