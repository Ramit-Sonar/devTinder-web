import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";
import UserCard from "./UserCard.jsx";

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
    <div className="flex justify-center px-4 py-6">
      {feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p>No users available in your feed.</p>
      )}
    </div>
  );
};

export default Feed;