import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { updateObject, checkValidity } from "../../../shared/utility";

export const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
        errorMessage: "Name field is required !",
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
        errorMessage: "Street field is required !",
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
      validation: {
        required: true,
        isNumeric: true,
        minLength: 5,
        maxLength: 5,
        errorMessage: "ZIP Code field should exactly be 5 numeric characters !",
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
        errorMessage: "Country field is required !",
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
        errorMessage: "Please enter a valid E-Mail !",
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault(); //stop sending request automatically

    const formData = {};
    for (const formElementName in orderForm) {
      formData[formElementName] = orderForm[formElementName].value;
    }

    const order = {
      ingredients: props.ings,
      price: (+props.price).toFixed(2),
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputName) => {
    const updatedFormElement = updateObject(orderForm[inputName], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputName].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputName]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (const inputName in orderForm) {
    formElementsArray.push(
      <Input
        key={inputName}
        elementType={orderForm[inputName].elementType}
        elementConfig={orderForm[inputName].elementConfig}
        value={orderForm[inputName].value}
        shouldValidate={orderForm[inputName].validation}
        invalid={!orderForm[inputName].valid}
        touched={orderForm[inputName].touched}
        changed={(event) => inputChangedHandler(event, inputName)}
        errorMessage={orderForm[inputName].validation.errorMessage}
      />
    );
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
