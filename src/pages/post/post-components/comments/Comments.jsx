import styled from "styled-components";

import { Comment } from "./Comment";
import { Icon } from "../../../../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../../selectors/selectors";
import { useServer } from "../../../../hooks";
import { addCommentAsync } from "../../../../actions/add-comment-async";

export const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState("");
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const requestServerFunc = useServer();

	const onNewCommentAdd = (userId, postId, content) => {
		dispatch(addCommentAsync(requestServerFunc, userId, postId, content));
		setNewComment("");
	};

	return (
		<div className={className}>
			<div className="new-comment">
				<textarea
					name="comment"
					value={newComment}
					placeholder="Комментарий..."
					onChange={({ target }) => setNewComment(target.value)}
				></textarea>

				<Icon
					iconId="fa-paper-plane-o"
					margin="0 10px 0 0"
					size="21px"
					onClick={() => {
						onNewCommentAdd(userId, postId, newComment);
					}}
				></Icon>
			</div>
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
						postId={postId}
					/>
				))}
			</div>
		</div>
	);
};
export const Comments = styled(CommentsContainer)`
	width: 600px;
	display: flex;
	margin: 20px auto;
	flex-direction: column;

	& textarea {
		width: 550px;
	}

	& .new-comment {
		display: flex;
		justify-content: space-between;
		width: 600px;
	}

	& .red {
		border: 1px solid red;
	}
`;
