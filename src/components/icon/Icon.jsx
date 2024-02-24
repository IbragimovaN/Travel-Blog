import styled from "styled-components";

export const IconContainer = ({ className, iconId, onClick }) => {
	return (
		<div className={className} onClick={onClick}>
			<i className={`fa ${iconId}`} aria-hidden="true"></i>
		</div>
	);
};
export const Icon = styled(IconContainer)`
	font-size: ${({ size = "20px" }) => size};
	margin: ${({ margin = "0" }) => margin};
	color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};
	&:hover {
		cursor: pointer;
	}
`;

export const IconWhite = styled(IconContainer)`
	font-size: ${({ size = "20px" }) => size};
	margin: ${({ margin = "0" }) => margin};

	&:hover {
		cursor: pointer;
	}
`;
