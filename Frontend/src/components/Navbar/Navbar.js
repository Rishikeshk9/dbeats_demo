import {useState} from 'react';
import classes from "./Navbar.module.css";
import {Navbar, Form,FormControl,Button} from "react-bootstrap";
import { scaleRotate as Menu } from 'react-burger-menu'

import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';


const NavBar = () => {

    const [showOpen,setOnOpen]=useState(false);

    const handleOnOpen = () =>{
      setOnOpen(true);
    }

    const isMenuOpen = (state) => {
      setOnOpen(state.isOpen)
    };

    return (
        <>
           <Menu
            customBurgerIcon={ false }
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            isOpen={ showOpen }
            onStateChange={ isMenuOpen }
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
          <Navbar expand="lg" id="navbarScroll" className={classes.body_navbar_style}>
                  <div>
                    <div className={classes.nav_sidebar_button}>
                        <MenuIcon onClick={handleOnOpen}/>
                    </div>
                  </div>
                  <Form className="d-flex">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      style={{borderRadius:"20px",width:"100%"}}
                    />
                    <div className={classes.searchIcon}>
                          <SearchIcon />
                      </div>
                  </Form>
                  <div align="right">
                      <Button className={classes.navbar_meetId}> <AccountCircleIcon className={classes.navbar_avatar} /> <span>ox84...6485 </span></Button>
                  </div>
          </Navbar>
        </>
    );
};

export default NavBar;
