# Introduction

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

## Why?

- **It decreases the cost of change.**  
Suppose the person in the above example begins carrying money in their hand. A utility function would help abstract this logic, but why should a utility function know how this person stores money? What if it varies between people?

- **It increases code transparency.**  
Method names are much easier to understand. The above example illustrates that we want to check that the person has no money, it's obvious which is easier to read.

- **It encourages better organization of data.**  
Not sure where to put data? How will it be used? Who will use it? Models ease the decision of where to put new data, whether existing or new.

- **It makes unit testing easier.**  
Tests that use models do not need knowledge of how data is structured; only a stub is required. This isolates your units and decouples them from data organization.
