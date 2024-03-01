import PropTypes from "prop-types";
import styled from "styled-components";
import { Error } from "./content-components/Error";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors/selectors";
import { PROP_TYPE } from "../../constants/prop-type";

export const ContentContainer = ({
	className,
	children,
	access,
	serverError = null,
}) => {
	const userRole = useSelector(selectUserRole);

	const accessError = access.includes(userRole) ? null : "Ошибка доступа";
	const error = serverError || accessError;
	return (
		<div className={className}>
			{error ? <Error error={error} /> : children}
		</div>
	);
};
export const Content = styled(ContentContainer)`
	display: "flex";
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
Content.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID).isRequired,
	serverError: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
};
