# API

- [`Model`](#model)
- [`subscribe`](#subscribe-component-reactcomponent-)


## Model

Meant to be extended, the `Model` class stores model logic and state. Instances of `Model` passed to `Subscriber` components will auto-update the component when `setState` is called. 

Similar to React components, instances of `Model` have a `state` property. When extending `Model`, it is best to write methods to retrieve state data.

### setState(object nextState)

Performs a shallow merge of `nextState` into current state. This is the primary method you use to update state and will update a `Subscriber` React component if passed as a prop.

Similar to React components, NEVER mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.


## subscribe({ component: ReactComponent })

Subscribes a React component to all instances of `Model` passed to it. It returns a new component class and does not modify the component class passed to it. 
