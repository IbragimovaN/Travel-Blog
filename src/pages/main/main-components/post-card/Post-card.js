import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { Link } from "react-router-dom";

export const PostCardContainer = ({
	id,
	className,
	title,
	publishedAt,
	imgUrl,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`posts/${id}`}>
				<img className="card-img" src={imgUrl} alt="n" />
				<div className="card-info">
					<h3 className="title">{title}</h3>
					<div className="card-footer">
						<div className="publishedAt">
							<Icon
								iconId="fa-calendar-o"
								margin="0 10px 0 0"
								size="14px"
							></Icon>
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon
								iconId="fa-comment-o"
								margin="0 10px 0 0"
								size="14px"
							></Icon>
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(66, 106, 194);
	width: 360px;
	height: 250px;
	margin: 10px 0 10px 0;

	& .card-info {
		padding: 5px;
	}

	& .card-img {
		width: 100%;
		height: 180px;
	}

	& .title {
		font-size: 14px;
	}

	& .card-footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	& .publishedAt {
		display: flex;
		flex-direction: row;
	}

	& .comments-count {
		display: flex;
		flex-direction: row;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	imgUrl: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
