import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "../../../../components";

export const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="current-page">Страница:{page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};
export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 10px 0;
	padding: 0 35px;

	& button {
		margin: 0 5px;
		font-size: 14px;
		width: 90px;
	}

	& .current-page {
		display: flex;
		justify-content: center;
		width: 90px;
		height: 32pxpx;
		font-size: 14px;
		font-weight: 500;
		align-items: center;
		border: 1px solid black;
	}

	&:children {
		background-color: #fff;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
