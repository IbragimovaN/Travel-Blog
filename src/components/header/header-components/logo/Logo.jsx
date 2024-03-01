import styled from "styled-components";
import LOGO from "../../../../image/logo.png";

export const LogoContainer = ({ className }) => {
	return (
		<div className={className}>
			<ImgLogo src={LOGO} alt="logo" />
		</div>
	);
};

export const Logo = styled(LogoContainer)`
	width: 70px;
	height: 70px;
`;

const ImgLogo = styled.img`
	width: 100%;
`;
