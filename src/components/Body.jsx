import { Outlet, useNavigate } from 'react-router'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    useEffect(() => {

        if (userData) return; // User data already exists; skip API call

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
                if (err.response?.status === 401) {
                    navigate("/login", { replace: true });
                } else {
                    console.error("Failed to fetch user:", err);
                }
            }
        };

        fetchUser();
    }, [userData, dispatch, navigate]);


    return (
        <div>
            <NavBar />
            {/* Child route components render here */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body
