import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
        
        this.state = {

        }
    }
    
    renderComment(dish){
        
        if(dish!=null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h3>Comments</h3>
                    <ul className="list-unstyled">
                        {dish.comments.map((Selectedcomment) => {
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

    renderDish(dish){
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

    render() {
        const dish=this.props.dish;
        
        return (
            <div className="container">
                <div className="row">
                    {this.renderDish(dish)}
                    {this.renderComment(dish)}
                </div>
            </div>
        );
    }

}

export default DishDetail;