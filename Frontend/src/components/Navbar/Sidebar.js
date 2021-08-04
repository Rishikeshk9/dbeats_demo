import {useState} from 'react'
import classes from "./Navbar.module.css";
import NavBar from "./Navbar"
import { scaleRotate as Menu } from 'react-burger-menu'


const SideBar = (props) => {
    
    const [sidebarOpen,setSidebarOpen]=useState(false);    

    const onSetSidebarOpen = (open) => {
        setSidebarOpen({ sidebarOpen: open });
    }


    return (
        <>
            <Menu
              pageWrapId={'page-wrap'}
              outerContainerId={'outer-container'}
            >
                <div className={classes.menu_items}>
                    <a id="home" href="#/home">
                        <i id={classes.menu_item} className="fa fa-fw fa-home" style={{ fontSize: '1em'}} />
                        <span className={classes.menu_item_name}> Home </span>
                    </a>
                </div>
                <div className={classes.menu_items}>
                    <a id="about" href="#/about">
                        <i id={classes.menu_item} className="fas fa-compass" style={{ fontSize: '1em' }} />
                        <span className={classes.menu_item_name} style={{ paddingLeft: '15px' }}> Explorer </span>
                    </a>
                </div>
                <div className={classes.menu_items}>
                    <a id="contact"  href="#/contact">    
                        <i id={classes.menu_item} className="fas fa-cogs" style={{ fontSize: '1em' }} />                    
                        <span className={classes.menu_item_name}> Setting </span>
                    </a>
                </div>
                
            </Menu>
        </>
    );
};

export default SideBar
