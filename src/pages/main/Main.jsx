import { useEffect, useState } from "react";
import styled from "styled-components";
import { useServer } from "../../hooks/use-server";
import { PostCard } from "./main-components/Post-card";

export const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);

	const requestServerFun = useServer();

	useEffect(() => {
		requestServerFun("fetchPosts").then((loadedPosts) => {
			if (posts.error) {
				return;
			}

			setPosts(loadedPosts.res);
		});
	}, []);

	return (
		<div className={className}>
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
	);
};
export const Main = styled(MainContainer)`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;
