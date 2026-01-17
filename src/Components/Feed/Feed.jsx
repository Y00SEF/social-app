import { useContext } from "react";
import { PostsContext } from "../usePosts/UsePosts";
import PostCard from "../PostCard/PostCard";
import PostCardSkeleton from "../Skeleton/PostCardSkeleton";

export default function Feed() {
  const { posts, loading } = useContext(PostsContext);

  return (
    <section className="py-10 p-5">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Latest Post
        </h2>

        {loading ? (
          <PostCardSkeleton />
        ) : (
          <div className="all-posts">
            {posts?.map((post) => (
              <PostCard key={post.id} postinfo={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
