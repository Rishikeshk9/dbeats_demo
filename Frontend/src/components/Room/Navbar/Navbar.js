import classes from "./Navbar.module.css";
import {Row, Col,Navbar, Form,FormControl,Button} from "react-bootstrap";

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const BodyNavbar = () => {

    return (
        <Navbar expand="lg">
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll" className={classes.body_navbar_style}>
                <Form className="d-flex" className={classes.search}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{borderRadius:"20px"}}
                  />
                  <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                </Form>
                <div>
                    <Button className={classes.navbar_meetId}> <AccountCircleIcon className={classes.navbar_avatar} /> <span>ox84...6485 </span></Button>
                </div>
              </Navbar.Collapse>
        </Navbar>
    );
};

export default BodyNavbar;
