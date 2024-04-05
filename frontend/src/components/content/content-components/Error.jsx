import PropTypes, { oneOfType } from "prop-types";
import styled from "styled-components";

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Error = ({ error }) => {
	return (
		error && (
			<Div>
				<h2>Ошибка</h2>
				<div>{error}</div>
			</Div>
		)
	);
};

Error.propTypes = {
	error: oneOfType([PropTypes.string, PropTypes.exact(null)]),
};
