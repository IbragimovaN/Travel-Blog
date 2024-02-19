import styled from "styled-components";

export const contentContainer = ({ className, children, error }) => {
	return (
		<div className={className}>
			{error ? (
				<>
					<h2>Ошибка</h2>
					<div>{error}</div>
				</>
			) : (
				children
			)}
		</div>
	);
};
export const Content = styled(contentContainer)`
	display: "flex";
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
