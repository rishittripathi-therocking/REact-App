import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader,ModalBody, Row, Col, Label, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control,  LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) =>!(val) || (val.length <= len);
    const minLength = (len) => (val) => (val) && (val.length >= len);
    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isModalCommentOpen: false
            }
            this.toggleModal=this.toggleModal.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
                isModalCommentOpen: !this.state.isModalCommentOpen
            });
        }

        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
            
        }

        render() {
            return(
                <React.Fragment>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil"></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalCommentOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.handleSubmit}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={{size:12}}>
                                        <Control.select model=".rating" id="rating" name="rating" placeholder="1" className="form-control"  >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"   validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                                        <Errors className="text-danger" model=".author" show="touched" messages={{required:'Required',minLength:'Must Be greater than 2 characters', maxLength:'Must be 15 Characters or less'}}></Errors>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment" rows="5" className="form-control" />
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">
                                    Submit
                                </Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );

        }
    }
    
    function RenderComment({comments, addComment, dishId}){
        
        if(comments!=null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h3>Comments</h3>
                    <ul className="list-unstyled">
                        {comments.map((Selectedcomment) => {
                            return(
                                <li key={Selectedcomment.id}>
                                    <p>{Selectedcomment.comment}</p>
                                    <p>--{Selectedcomment.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(Selectedcomment.date)))}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment}/>    
                </div>
            );
            
        }
        else{
            return(
                <div></div>
            );
        }
    }

    function RenderDish({dish}){
        if(dish!=null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" object src={baseUrl + dish.image} alt={dish.name}></CardImg>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        if(props.dish!=null){
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComment comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }



export default DishDetail;