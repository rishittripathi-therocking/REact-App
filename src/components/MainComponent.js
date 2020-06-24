import React, { Component } from 'react';
import Menu from './menuComponent.js';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './dishDetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comment';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {  
      
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS

    };
  }

  onDishSelect(dishID) {
    this.setState({selectedDish: dishID});

  }

  render() {
    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0] } promotion={this.state.promotions.filter((promo) => promo.featured)[0] } leader={this.state.leaders.filter((leader) => leader.featured)[0] }  />
      );
    }

    const DishWithID = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0] } comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    }

    const AboutUS = () => {
      return(
        <About leaders={this.state.leaders} />
      );
    }

    return (
      <div> 
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
            <Route path="/menu/:dishId" component={ DishWithID } />
            <Route exact path="/aboutus" component={ AboutUS } />
            <Route exact path="/contactus" component={ Contact } />
            <Redirect to="/home" />
          </Switch>
          <Footer />    
      </div>
    );
  }
}

export default Main;
