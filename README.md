# React Axiom

[![npm version](https://badge.fury.io/js/react-axiom.svg)](https://badge.fury.io/js/react-axiom) [![Build Status](https://travis-ci.org/wgoto/react-axiom.svg?branch=master)](https://travis-ci.org/wgoto/react-axiom) [![codecov](https://codecov.io/gh/wgoto/react-axiom/branch/master/graph/badge.svg)](https://codecov.io/gh/wgoto/react-axiom)

## Getting Started

```
npm install --save react-axiom
```

## Documentation

- [API Documentation](https://wgoto.gitbooks.io/react-axiom/content)

## Introduction

React Axiom is a lightweight (~12kb) way to use models with the React component tree. A basic React Axiom model looks like the following:

```jsx
class ListItemModel extends ReactAxiom.Model {

  constructor({ id, description = '', completed = false }) {
    super({ id, description, completed });
  }

}
```

Model stores the argument object in this.state and automatically creates getter and setter functions: `getId`, `setId`, `hasId` for the `id` property, `getDescription`, `setDescription`, `hasDescription` for the `description` property, and `isCompleted`, `setCompleted`, `hasCompleted` for the `completed` property (note: this is different due to the completed property being a boolean). Defining a method of the same name on the class overwrites the getter or setter:

```jsx
class ListItemModel extends ReactAxiom.Model {

  constructor({ id, description = '', completed = false }) {
    super({ id, description, completed });
  }

  getDescription() {
    return this.state.description.toLowerCase();
  }

}
```

When a React Axiom model is passed into a component, the component listens to state changes within the model and updates itself. The following is an example of a React component using a model passed as `listItem` below:

```jsx
class ListItemComponent extends React.Component {

  render() {
    const { listItem } = this.props;
    return (
      <li>
        {listItem.getDescription()}
        {listItem.isCompleted() ? null : this.renderButton()}
      </li>
    );
  }

  renderButton() {
    const { listItem } = this.props;
    return (
      <button onClick={() => listItem.setCompleted(true)}>
        complete
      </button>
    );
  }

}
```

Notice how the component calls `setCompleted` on the `listItem` model to update state. To put everything together:

```jsx
const listItem = new ListItemModel({
  id: '1',
  description: 'Teach mom how to use Slack'
});

const ListItemSubscriber = ReactAxiom.subscribe({
  component: ListItemComponent
});

ReactDOM.render(
  <ListItemSubscriber listItem={listItem} />,
  document.getElementById('app')
);
```

The higher order `subscribe` function wraps the `ListItemComponent` and returns a new `ListItemSubscriber` component. The `ListItemSubscriber` component will then subscribe to the `listItem` model and update itself if state changes. In the specific above example, clicking on the complete button will cause the button to disappear.
