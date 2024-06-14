import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <>
            <div className="flex mt-16 min-h-screen ">
                <div className="w-[19.5%] bg-gray-100"><Sidebar /></div>
                <div className="w-4/5 bg-gray-100 pt-10">
                    <main className="p-4">{children}</main>
                </div>
            </div>
            </>
        </React.Fragment>
    );
};

export default Layout;