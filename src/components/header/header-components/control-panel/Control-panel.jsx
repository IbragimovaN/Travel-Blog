import styled from "styled-components";
import { Icon } from "../../../icon/Icon";
import { Link, useNavigate } from "react-router-dom";

export const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<RightAlign>
				<StyledLink to="/login">Войти</StyledLink>
			</RightAlign>
			<RightAlign>
				<div onClick={() => navigate(-1)}>
					<Icon iconId="fa-backward" margin="10px 0 0 10px"></Icon>
				</div>
				<Link to="/post">
					<Icon iconId="fa-file-text-o" margin="10px 0 0 16px"></Icon>
				</Link>
				<Link to="/users">
					<Icon iconId="fa-users" margin="10px 0 0 16px"></Icon>
				</Link>
			</RightAlign>
		</div>
	);
};
export const ControlPanel = styled(ControlPanelContainer)`
	display: "flex";
`;

const RightAlign = styled.div`
	display: flex;
	justify-content: flex-end;
`;
const StyledLink = styled(Link)`
	font-size: 18px;
	width: 100px;
	height: 32px;
	box-shadow:
		0 8px 16px 0 rgba(0, 0, 0, 0.2),
		0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border: 1px solid black;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0 20px #000;
	background-color: #426ac2;
`;

// const StyledButton = styled.div`
// 	&:hover {
// 		cursor: pointer;
// 	}
// `;
