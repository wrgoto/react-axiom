# Model

This class is the building block of React Axiom and extends the `Publisher` class. Models of an application should extend the `Model` class as it is an abstraction and should not be instantiated directly.

```javascript
import { Model } from 'react-axiom';
```

*Note: this documentation specifically covers the interfacing API of the `Model` class. For information on how to create models, see the [introduction](https://medium.com/@wrgoto/introducing-react-axiom-84bf37a50adb).*

- [`static defaultState()`](#static--defaultstate-)
- [`createHelpers()`](#-createhelpers-)
- [`get[StatePropName]()`](#-get-statepropname-)
- [`has[StatePropName]()`](#-has-statepropname-)
- [`initState(state)`](#-initstate-state-)
- [`is[StatePropName]()`](#-is-statepropname-)
- [`set[StatePropName](value)`](#-set-statepropname-value-)
- [`setState(state)`](#-setstate-state-)

## `static defaultState()`

This class method sets the default state for a class and should return state described as a plain object. If this is not defined, the default state is an empty object.

```javascript
class Task extends Model {
  static defaultState() {
    return {
      completed: false,
      description: ''
    };
  }
}
```

## `createHelpers()`

This method will generate helper methods for all properties in state if they do not already exist. Always access and modify state through these generated helpers.

For **non-boolean properties**, this method will generate the following methods:

- [`get[StatePropName]()`](#-get-statepropname-)
- [`has[StatePropName]()`](#-has-statepropname-)
- [`set[StatePropName](value)`](#-set-statepropname-value-)

For **boolean properties**, this method will generate the following methods:

- [`is[StatePropName]()`](#-is-statepropname-)
- [`set[StatePropName](value)`](#-set-statepropname-value-)

*Note: there are very few cases in which `createHelpers()` should be invoked explicitly. This happens automatically when creating models correctly.*

## `get[StatePropName]()`

This generated method will return a **non-boolean** state property defined either by the `defaultState()` class method or the initial state argument object passed to the constructor.

`StatePropName` is the name of the property in state but with the first letter capitalized, i.e. the `getDescription()` method returns `this.state.description`.

```javascript
const task = new Task({
  description: 'Program things'
});

task.getDescription();
//=> 'Program things'
```

## `has[StatePropName]()`

This generated method will return a **coerced boolean** of a state property defined either by the `defaultState()` class method or the initial state argument object passed to the constructor.

```javascript
const task = new Task({
  description: 'Program more things'
});

task.hasDescription();
//=> true
```

## `initState(state)`

This method sets the initial state of an instance by shallow merging default state defined by the `defaultState()` static method with the `state` argument object. The model stores state in `this.state`, but should never be accessed or assigned directly.

```javascript
this.initState({
  completed: false,
  description: 'Program even more things'
});
```

*Note: there are very few cases in which `initState()` should be invoked explicitly. This happens automatically when creating models correctly.*

## `is[StatePropName]()`

This generated method will return a **boolean** state property defined either by the `defaultState()` class method or the initial state argument object passed to the constructor.

```javascript
const task = new Task({
  completed: true
});

task.isCompleted();
//=> true
```

## `set[StatePropName](value)`

This generated method will set the state for a specific property by calling `setState()` with an argument object. The argument object contains the `statePropName` key mapped to the provided `value`.

```javascript
task.setDescription('Program all the things');

task.getDescription();
//=> 'Program all the things'
```

## `setState(state)`

This method works similarly to a React component's `setState()` method with the exception that it **synchronously** changes model state. It performs a shallow merge of the `state` argument object into the current state.

```javascript
task.setState({
  description: 'Go outside'
});

task.state.description;
//=> 'Go outside'

task.getDescription();
//=> 'Go outside'
```
