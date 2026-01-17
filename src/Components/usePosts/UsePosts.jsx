import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Auth.context";

export const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  async function getAllPosts() {
    if (!token) return; // Don't fetch if no token
    try {
      let { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50&page=101",
        {
          headers: {
            token: token,
          },
        }
      );

      setPosts(data.posts.reverse());
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getAllPosts();
    }
  }, [token]);

  return (
    <PostsContext.Provider value={{ posts, loading, getAllPosts }}>
      {children}
    </PostsContext.Provider>
  );
}
