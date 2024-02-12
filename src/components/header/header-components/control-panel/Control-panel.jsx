import styled from "styled-components";
import { Icon } from "../../../icon/Icon";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../button/Button";

export const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<RightAlign>
				<Button>
					<Link to="/login">Войти</Link>
				</Button>
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
