import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



    
    function RenderComment({comments}){
        
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
                        <CardImg width="100%" object src={dish.image} alt={dish.name}></CardImg>
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
        const dish=props.dish;
        if(dish!=null){
            return (
                <div className="container">
                    <div className="row">
                        <RenderDish dish={dish} />
                        <RenderComment comments={dish.comments} />
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