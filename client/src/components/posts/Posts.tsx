import { useSelector } from "react-redux"
import { Row , Col , Container } from "react-bootstrap"
import Card from "../card/Card";
import { Post } from "./../../model/model";
import SideBar from "../side-bar/SideBar";

const Posts = ({posts} : {posts:Post []}) => {

    return (
        <div className="posts-contaier">
            <Container>
                <Row>
                    <Col lg={9}>
                        <Row>
                            {posts?.length > 0 ?
                            posts.map((post:Post) => {
                                return(
                                    <Col lg={6} key = {post._id}>
                                        <Card post = {post} />
                                    </Col>
                                )
                            }) : "Loading"}
                        </Row>
                    </Col>
                    <Col lg={3}>
                        <div className="py-3">
                            <SideBar />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Posts
