import classes from "./Navbar.module.css";
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    InputBase
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Navbar = () => {

    return (
        <div>
            <AppBar position="static" >
                <Toolbar className={classes.navbar}>
                    <div>
                        <IconButton edge="start" aria-label="menu">
                            <MenuIcon className={classes.navbar_menuButton} />
                        </IconButton>
                    </div>

                    <div className={classes.search}>
                        <InputBase
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                    </div>

                    <div className={classes.navbar_meetId}>
                        <Button > <AccountCircleIcon className={classes.navbar_avatar} /> <span>ox84...6485 </span></Button>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
