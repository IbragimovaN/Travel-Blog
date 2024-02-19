import styled from "styled-components";
import { IconWhite } from "../../../icon/Icon";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../button/Button";
import { ROLE } from "../../../../constants/roleId";
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from "../../../../selectors/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../actions/logout";

export const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	return (
		<div className={className}>
			<RightAlign>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>{" "}
					</Button>
				) : (
					<>
						<div>{login}</div>
						<div onClick={() => dispatch(logout(session))}>
							<IconWhite iconId="fa-sign-out" margin="0 0 0 20px"></IconWhite>
						</div>
					</>
				)}
			</RightAlign>
			<RightAlign>
				<div onClick={() => navigate(-1)}>
					<IconWhite iconId="fa-backward" margin="10px 0 0 10px"></IconWhite>
				</div>
				<Link to="/post">
					<IconWhite iconId="fa-file-text-o" margin="10px 0 0 16px"></IconWhite>
				</Link>
				<Link to="/users">
					<IconWhite iconId="fa-users" margin="10px 0 0 16px"></IconWhite>
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
