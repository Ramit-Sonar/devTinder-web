import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/user/connections`,
                    { withCredentials: true }
                );

                dispatch(addConnection(res.data.data));
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to fetch connections."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchConnections();
    }, [dispatch]);

    if (loading) return <p>Loading connections...</p>;

    if (error) return <p className="text-red-500">{error}</p>;

    if (connections.length === 0) {
        return <p>No connections found.</p>;
    }

    return (
        <div>
            {connections.map((connection) => (
                <div key={connection._id}>
                    <h2>
                        {connection.firstName} {connection.lastName}
                    </h2>
                    <p>{connection.about}</p>
                </div>
            ))}
        </div>
    );
};

export default Connections;