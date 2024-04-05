import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, deleteCommentAsync, openModal } from "../../../../actions";
import { ROLE } from "../../../../constants/roleId";
import { selectUserRole } from "../../../../selectors/selectors";

export const CommentContainer = ({
	className,
	content,
	publishedAt,
	author,
	id,
	postId,
}) => {
	const dispatch = useDispatch();
	const roleAd = useSelector(selectUserRole);

	const onCommentDelete = (id) => {
		dispatch(
			openModal({
				text: "Удалить комментарий?",
				onConfirm: () => {
					dispatch(deleteCommentAsync(postId, id));
					dispatch(closeModal);
				},
				onCancel: () => {
					dispatch(closeModal);
				},
			}),
		);
	};
	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(roleAd);
	return (
		<div className={className}>
			<div className="commentWrapper">
				<div className="information-panel">
					<div className="author">
						<Icon
							iconId="fa-user-circle-o"
							margin="0 10px 0 10px"
							size="18px"
						></Icon>
						<div>{author}</div>
					</div>
					<div className="publishedAt">
						<div>{publishedAt}</div>
						<Icon
							iconId="fa-calendar-o"
							margin="0 10px 0 10px"
							size="18px"
						></Icon>
					</div>
				</div>
				<div>{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					className="deleteIcon"
					onClick={() => onCommentDelete(id)}
					iconId="fa-trash-o"
					margin="0 10px 0 0"
					size="18px"
				></Icon>
			)}
		</div>
	);
};
export const Comment = styled(CommentContainer)`
	display: flex;
	width: 600px;
	justify-content: space-between;
	margin-top: 10px;

	& .commentWrapper {
		display: grid;
		grid-template: 20px 30px / 1fr;
		width: 555px;
		border: 1px solid black;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .deleteIcon {
		width: 16px;
		height: 24px;
		align-self: flex-end;
	}

	& .author {
		display: flex;
	}

	& .publishedAt {
		display: flex;
	}
`;

Comment.propTypes = {
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired,
};
