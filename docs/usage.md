# Usage

A React Axiom model is a simple javascript class:

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
