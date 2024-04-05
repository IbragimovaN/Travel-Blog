import styled from "styled-components";
import { IconWhite } from "../../../icon/Icon";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../button/Button";
import { ROLE } from "../../../../constants/roleId";
import {
	selectUserRole,
	selectUserLogin,
} from "../../../../selectors/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../actions/logout";

export const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem("userData");
	};

	const isAdmin = [ROLE.ADMIN].includes(roleId);

	return (
		<div className={className}>
			<RightAlign>
				{roleId === ROLE.GUEST ? (
					<Button background={"#426ac2"}>
						<Link to="/login">Войти</Link>{" "}
					</Button>
				) : (
					<>
						<div>{login}</div>
						<div onClick={onLogout}>
							<IconWhite iconId="fa-sign-out" margin="0 0 0 20px"></IconWhite>
						</div>
					</>
				)}
			</RightAlign>
			<RightAlign>
				<IconWhite
					iconId="fa-backward"
					margin="10px 0 0 10px"
					onClick={() => navigate(-1)}
				></IconWhite>

				{isAdmin && (
					<>
						<Link to="/post">
							<IconWhite
								iconId="fa-file-text-o"
								margin="10px 0 0 16px"
							></IconWhite>
						</Link>
						<Link to="/users">
							<IconWhite iconId="fa-users" margin="10px 0 0 16px"></IconWhite>
						</Link>
					</>
				)}
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
