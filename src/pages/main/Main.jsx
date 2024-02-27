import { useEffect, useState } from "react";
import styled from "styled-components";
import { useServer } from "../../hooks/use-server";
import { PostCard, Pagination } from "./main-components";
import { PAGINATION_LIMIT } from "../../constants/pagination-limit";
import { getLastPageFromLink } from "./utils/get-last-page-from-link";

export const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const requestServerFun = useServer();

	useEffect(() => {
		requestServerFun("fetchPosts", page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				if (posts.error) {
					return;
				}

				setPosts(posts);
				console.log(getLastPageFromLink(links));
				setLastPage(getLastPageFromLink(links));
			},
		);
	}, [requestServerFun, posts.error, page]);

	return (
		<div className={className}>
			<div className="post-list">
				{posts.map(({ id, title, publishedAt, imgUrl, commentsCount }) => (
					<PostCard
						key={id}
						id={id}
						title={title}
						publishedAt={publishedAt}
						imgUrl={imgUrl}
						commentsCount={commentsCount}
					/>
				))}
			</div>
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};
export const Main = styled(MainContainer)`
	& .post-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
`;
