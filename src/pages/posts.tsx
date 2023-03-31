import { useDispatch, useSelector } from "react-redux";
import { loadposts } from "../store/productsSlice";
import { useEffect } from "react";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.list);

  useEffect(() => {
    const action = loadposts();
    dispatch(action);
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
