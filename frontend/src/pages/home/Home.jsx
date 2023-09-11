import React from 'react'
import "./Home.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Timeline from '../../components/timeline/Timeline'

export default function Home() {
    return (
        <>
            <Topbar />
            <div className='homeContainer'>
                <Sidebar />
                <Timeline />
                <Rightbar />
            </div>
        </>
    );
}
