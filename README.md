# React Axiom

[![npm version](https://badge.fury.io/js/react-axiom.svg)](https://badge.fury.io/js/react-axiom) [![Build Status](https://travis-ci.org/wgoto/react-axiom.svg?branch=master)](https://travis-ci.org/wgoto/react-axiom) [![codecov](https://codecov.io/gh/wgoto/react-axiom/branch/master/graph/badge.svg)](https://codecov.io/gh/wgoto/react-axiom)

React Axiom is a way to use models with React.

## Introduction

React Axiom introduces the concept of models for data management.

To update a React Component with React Redux:

```jsx
if (this.props.person.pockets.every(pocket => pocket.dollars === 0)) {
  this.props.dispatch(personAddDollarsToPocket(20));
}
```

To update a React Component with React Axiom:

```jsx
if (this.props.person.hasNoDollars()) {
  this.props.person.giveDollars(20);
}
```

### Why?

- **It decreases the cost of change.**  
Suppose the person in the above example begins carrying money in their hand. A utility function would help abstract this logic, but why should a utility function know how this person stores money? What if it varies between people?

- **It increases code transparency.**  
Method names are much easier to understand. The above example illustrates that we want to check that the person has no money, it's obvious which is easier to read.

- **It encourages better organization of data.**  
Not sure where to put data? How will it be used? Who will use it? Models ease the decision of where to put new data, whether existing or new.

- **It makes unit testing easier.**  
Tests that use models do not need knowledge of how data is structured; only a stub is required. This isolates your units and decouples them from data organization.

## Usage

Extend the React Axiom `Model` class:

```jsx
import { Model } from 'react-axiom';

class Person extends Model {
  constructor({ id, dollars = 0 }) {
    super();
    this.state = { id, dollars };
  }
  
  getDollars() {
    return this.state.dollars;
  }
  
  hasNoDollars() {
    return this.getDollars() === 0;
  }

  giveDollars(dollars) {
    this.setState({
      dollars: this.getDollars() + dollars
    });
  }
}

export default Person;
```

Look familiar? The React Axiom Model uses the same naming conventions to trigger updates in React Components. The following is a typical React Component class:

```jsx
import React from 'react';

class Teller extends React.Component {
  render() {  
    return this.props.person.hasNoDollars() ? this.renderButton() : 'Customer already has $20!';
  }
  
  renderButton() {
    return (
      <button onClick={() => this.props.person.giveDollars(20)}>
        Give $20
      </button>
    );
  }
}

export default Teller;
```

To put it all together:

```jsx
import ReactDom from 'react-dom';
import { subscribe } from 'react-axiom';
import Person from 'Person.js';
import Teller from 'Teller.js';

// Create an instance of Person i.e. instance of Model
const customer = new Person({ id: 'Johnny', dollars: 0 });

// Wrap the Teller React Component with a Subscriber class
const TellerSubscriber = subscribe({ component: Teller });

// Subscriber class will auto-subscribe to any instance of Model passed as a prop
ReactDOM.render(<TellerSubscriber person={customer} />, document.getElementById('bank'));
```

That's it! The component will work as expected.

## Documentation

- [API](docs/api.md)
