import {useState} from "react";
import {useDispatch , useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import {Nav , Container, Row, Col , Button} from "react-bootstrap";
import SocialIcon from "../social/SocialIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookSquare , faTwitterSquare , faInstagramSquare} from "@fortawesome/free-brands-svg-icons";
import style from "./NavBar.module.css";
import NavMenu from "../../layout/navmenu/NanMenu";
import Link from "./../../layout/link/Link";
import {User} from "./../../model/model";
import SERVER_URL from "../../model/api-url"; 
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../store/store";
import { logout as signout } from "../../store/action-creator/auth";

const NavBar = () => {
    const [search , SetSearch] = useState(false);
    const {auth:{token} , user:{user}} = useSelector((state:RootState) => state)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        console.log("logout")
        dispatch(signout())
    }

    return (
        <Nav className={`${style.nav} py-3 align-items-center`}>
            <Container>
                <Row>
                    <Col md={3} className="d-flex justify-content-center align-items-center">
                        <SocialIcon>
                            <FontAwesomeIcon icon={faFacebookSquare}/>
                        </SocialIcon>
                        <SocialIcon>
                            <FontAwesomeIcon icon={faTwitterSquare}/>
                        </SocialIcon>
                        <SocialIcon>
                            <FontAwesomeIcon icon={faInstagramSquare}/>
                        </SocialIcon>
                    </Col>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <NavMenu>
                            <NavMenu.MenuList>
                                <Link route="/">
                                    home
                                </Link>
                            </NavMenu.MenuList>
                            <NavMenu.MenuList>
                                <Link route="/about">
                                    about
                                </Link>
                            </NavMenu.MenuList>
                            <NavMenu.MenuList>
                                <Link route="/contact">
                                    contact
                                </Link>
                            </NavMenu.MenuList>
                            <NavMenu.MenuList >
                                <Link route="/write">
                                    write
                                </Link>
                            </NavMenu.MenuList>
                        </NavMenu>
                    </Col>
                    <Col md={3} className="d-flex justify-content-center align-items-center">
                        {token && user?
                        <div className="d-flex" title={user.username!}>
                            
                            {/* <img src = {`${SERVER_URL}/uploads/users/${user.image}` /> */}
                            <div  className={style['user-account']}>
                                <Link route="/account">
                                    <img src = {`${SERVER_URL}/uploads/users/${user.image}`} alt="..." className="img-fluid" />
                                </Link>
                            </div>
                            <div title = "logout " onClick={logout} className="d-flex justify-content-center align-items-center ps-2">
                                <SocialIcon>
                                    <FontAwesomeIcon icon={faSignOutAlt}/>
                                </SocialIcon>
                            </div>
                        </div>
                        : 
                        <Button className = "p-0" variant="dark">
                            <Link route = "/login">
                                <span style={{color: "#FFF"}}>login</span>
                            </Link>
                        </Button>
                        }
                    </Col>
                </Row>
            </Container>
        </Nav>
    )
}

export default NavBar;
