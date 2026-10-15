import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.user);

    const [authChecked, setAuthChecked] = useState(
        () => Boolean(userData)
    );

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/profile/view`,
                    {
                        withCredentials: true
                    }
                );

                dispatch(addUser(res.data));
            } catch (err) {
                if (err.response?.status !== 401) {
                    console.error("Failed to fetch user:", err);
                }
            } finally {
                setAuthChecked(true);
            }
        };

        if (!userData) {
            fetchUser();
        }
    }, [dispatch, userData]);

    return (
        <div>
            <NavBar />
            <Outlet context={{ authChecked }} />
            <Footer />
        </div>
    );
};

export default Body;