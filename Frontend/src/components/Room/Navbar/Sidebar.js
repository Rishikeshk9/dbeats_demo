import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import classes from "./Navbar.module.css";

const Sidebar = (props) => {
 

  return (
        <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
            expanded="true"
            className={classes.sidebar_css}
        >
            <SideNav.Toggle style={{ marginLeft:"75%"}}>
            </SideNav.Toggle>
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                      <NavIcon >
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em'}} />
                      </NavIcon>
                    
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="explore">
                    <NavIcon>
                        <i className="fas fa-compass" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Explore
                    </NavText>
                </NavItem>
                <NavItem eventKey="setting">
                    <NavIcon>
                        <i className="fas fa-cogs" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Setting
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};

export default Sidebar