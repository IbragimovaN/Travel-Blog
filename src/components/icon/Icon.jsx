import styled from "styled-components";

export const IconContainer = ({ className, iconId }) => {
	return (
		<div className={className}>
			<i className={`fa ${iconId}`} aria-hidden="true"></i>
		</div>
	);
};
export const Icon = styled(IconContainer)`
	font-size: ${({ size = "20px" }) => size};
	margin: ${({ margin = "0" }) => margin};
	&:hover {
		cursor: pointer;
	}
`;
