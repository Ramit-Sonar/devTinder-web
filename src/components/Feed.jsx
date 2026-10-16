
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";
import UserCard from "./UserCard.jsx";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const [loading, setLoading] = useState(feed.length === 0);
  const [error, setError] = useState("");

  useEffect(() => {
    // If users are already available in Redux, skip the API request.
    if (feed.length > 0) return;

    const getFeed = async () => {
      try {
        setError("");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/feed`,
          { withCredentials: true }
        );

        dispatch(addFeed(res.data.data));
      } catch (err) {
        console.error("Failed to fetch feed:", err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, [dispatch]);

  return (
    <div className="flex justify-center px-4 py-6">
      {loading ? (
        <div className="flex flex-col items-center gap-3 py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-sm text-base-content/60">
            Finding people for you...
          </p>
        </div>
      ) : error ? (
        <p className="py-10 text-error">{error}</p>
      ) : feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p className="py-10 text-base-content/60">
          No users available in your feed.
        </p>
      )}
    </div>
  );
};

export default Feed;
