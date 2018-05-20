import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  }

  updatePurchaseState() {

    const ingredients = { ...this.state.ingredients }
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });

  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  addIngredientHandler = type => {
    
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    }, () => this.updatePurchaseState());

  }

  removeIngredientHandler = type => {

    const oldCount = this.state.ingredients[type];

    if(oldCount <= 0) return;

    const updatedCount = oldCount - 1;

    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    }, () => this.updatePurchaseState());

  }


  render() {

    const disabledInfo = { ...this.state.ingredients }

    for (const key in disabledInfo)
      disabledInfo[key] = disabledInfo[key] <= 0;

    return (
      <Aux>
        
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          purchasable={this.state.purchasable}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasingHandler={this.purchaseHandler}
        />

      </Aux>
    );
  }

}

export default BurgerBuilder;