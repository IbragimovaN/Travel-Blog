import PropTypes from "prop-types";
import styled from "styled-components";

export const ButtonContainer = ({
	children,
	className,
	width,
	background,
	...props
}) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};
export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: ${({ width = "100%" }) => width};
	height: 32px;
	border: 1px solid rgb(0, 0, 0);
	background-color: ${({ background }) => background};
	// background-color: #426ac2;
	&:hover {
		cursor: pointer;
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
