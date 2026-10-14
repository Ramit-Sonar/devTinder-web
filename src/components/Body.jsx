import { Outlet } from 'react-router'
import NavBar from './NavBar'
import Footer from './Footer'

const Body = () => {
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
