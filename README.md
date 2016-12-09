# React Axiom

React Axiom is a way to use models with React.

[![npm version](https://badge.fury.io/js/react-axiom.svg)](https://badge.fury.io/js/react-axiom) [![Build Status](https://travis-ci.org/wgoto/react-axiom.svg?branch=master)](https://travis-ci.org/wgoto/react-axiom) [![codecov](https://codecov.io/gh/wgoto/react-axiom/branch/master/graph/badge.svg)](https://codecov.io/gh/wgoto/react-axiom)

## Links

- [Introduction](https://medium.com/@wrgoto/84bf37a50adb)
- [Documentation](http://react-axiom.com)

## Getting Started

Install React Axiom:

```
npm install --save react-axiom
```

To build a model class for an application, import and extend the React Axiom `Model` class:

```javascript
import { Model } from 'react-axiom';

class Task extends Model {};

const task1 = new Task({
  completed: false,
  description: 'Hello world'
});
```

When instantiating a model, the `Model` base class will meta-program helper methods to set and access state. See the [model reference](http://react-axiom.com/model) for more information on these helper methods. For this particular example they are the following:

```javascript
task1.isCompleted();
//=> false

task1.setCompleted(true);
task1.isCompleted();
//=> true

task1.getDescription();
//=> 'Hello world'

task1.hasDescription();
//=> true

task1.setDescription('Hello again');
task1.getDescription();
//=> 'Hello again'
```

Create a React component to display the task model and wrap the component with the higher-order React Axiom `subscribe()` function to ensure that the React component will re-render when the model's state changes:

```javascript
import React from 'react';
import { subscribe } from 'react-axiom';

class TaskComponent from React.Component {
  render() {
    const { task } = this.props;
    return (
      <li>
        <input
          type="checkbox"
          onClick={() => task.setCompleted(true)}
          checked={task.isCompleted()}
        />
        {task.getDescription()}
      </li>
    );
  }
}

const TaskSubscriber = subscribe(TaskComponent);
```

Finally, use the wrapped component like any other React component and pass the model instance as a property:

```javascript
ReactDOM.render(<TaskSubscriber task={task1} />);
```
