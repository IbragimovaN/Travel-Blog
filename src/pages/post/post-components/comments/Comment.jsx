import styled from "styled-components";
import { Icon } from "../../../../components";
import { useServer } from "../../../../hooks";
import { useDispatch } from "react-redux";
import { closeModal, deleteCommentAsync, openModal } from "../../../../actions";

export const CommentContainer = ({
	className,
	content,
	publishedAt,
	author,
	id,
	postId,
}) => {
	const requestServerFun = useServer();
	const dispatch = useDispatch();

	const onCommentDelete = (id) => {
		dispatch(
			openModal({
				text: "Удалить комментарий?",
				onConfirm: () => {
					dispatch(deleteCommentAsync(requestServerFun, postId, id));
					dispatch(closeModal);
				},
				onCancel: () => {
					dispatch(closeModal);
				},
			}),
		);
	};

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

			<Icon
				className="deleteIcon"
				onClick={() => onCommentDelete(id)}
				iconId="fa-trash-o"
				margin="0 10px 0 0"
				size="18px"
			></Icon>
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
