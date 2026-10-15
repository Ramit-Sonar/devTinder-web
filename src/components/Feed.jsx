import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  useEffect(() => {
    if (feed && feed.length > 0) return;

    const getFeed = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/feed`,
          {
            withCredentials: true
          }
        )
        dispatch(addFeed(res.data.data))
      } catch (err) {
        console.error("Failed to fetch feed:", err)
      }
    }

    getFeed();
  }, [dispatch, feed])

  return (
    <div>
      <h1>DevTinder Feed</h1>

      {feed?.map((user) => (
        <div key={user._id}>
          <h2>{user.firstName} {user.lastName}</h2>
          <p>{user.about}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;