##  1. What is the difference between Component and PureComponent? Give an example where it might break my app

PureComponent is exactly the same as Component except that it handles the ```bash shouldComponentUpdate``` method for you.

When props or state changes, PureComponent will do a shallow comparison on both props and state. Where as component on the other hand won’t compare current props and state to next out of the box. Thus, the component will re-render by default whenever ```bash shouldComponentUpdate``` is called.

Pure component will increase our app performance because of shallow comparison suppose For example, lets say that we have a component tree.

When the parent's props are changed in a way that the props of only one child are changed, then:

if all components are regular components, then the entire component tree will rerender there might be chance here if application is bigger many rerender might cause browser slow and crash the application.  

Where as children and grandchildren are pure components, then only one child will rerender, and one or all of its grandchildren, depending on whether their props are changed. If there are many components in this component tree, it may mean a significant performance boost.

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Context is used to communicate with deeply contained components. For example, a root component defines a theme, and any component in the component tree might (or might not) be interested in this information.

shouldComponentUpdate on the other hand short circuits the re-rendering of a part of the component tree (including children), for example if the props or state of a component are not modified in a meaningful way. As far as the component can tell. 
But this might accidentally block context propagation

## 3. Describe 3 ways to pass information from a component to its PARENT

- Using callback function: 
Pass a function of parent component to child component to use as a callback. That function will take the data of child component as functional argument which we want to send back to the parent component.
If we want to perform certain actions whenever the data in child component is updated, then we can pass the updated data to the callback function.

- Using useRef hook: 
It is one of the most useful hooks in the react to store the data without re-rendering the child components. It will not trigger any event by itself whenever the data is updated.
If we just want to store the updated data from child component in the parent component, and will perform the actions later, then this approach is much suitable.

- The other way I know is user 3rd party libraries like Redux and MobX where we can update state in any child component and updated value wil be available in any parent component where we are using state variable.

## 4. Give 2 ways to prevent components from re-rendering.

We can use useMemo() and useCallback() Hooks
These Hooks reduce re-renderings by caching and returning the same output if the inputs are the same without any computations. When the inputs updates, the cache gets invalidated and the new component state gets rendered.

Using UseRef 
The second way to preventing unnecessary re-renders is using the useRef hook, which can prevent unnecessary re-renders by storing a mutable value that persists across renders.

## 5. What is a fragment and why do we need it? Give an example where it might break my app

Fragments are syntax that allow us to add multiple elements to a React component without wrapping them in an extra DOM node.

Example:
```
<function TableData () {
  return  (
    <>
      <td>Eat</td>
      <td>Learn</td>
      <td>Code</td>
    <>
  );
}
```
We will encounter a SyntaxError for below code. And thus, crashing our application in development

```
const App = () => {
  return (
    <h1>This is heading1 text</h1>
    <p>This is paragraph text</p>
  );
}

export default App
```
Sometimes when we work with nested components, these wrappers can cause anomaly in the code. For instance, the div can cause the layout to break when working with the CSS Flexbox and Grid. We may also experience invalid HTML for elements that must follow a specific structure like ```ul > li``` and ```table>tr>td```

This approach has not been efficient and may cause issues in some cases. Eg.

```
function TableData () {
  return  (
    <div>
      <td>Eat</td>
      <td>Learn</td>
      <td>Code</td>
    </div>
  );
}

function Table () {
  return (
    <table>
      <tr>
        <TableData />
      </tr>
    </table>
  );
}
```
The above code will produce the HTML equivalent below.
```
<table>
  <tr>
    <div>
       <td>Eat</td>
      <td>Learn</td>
      <td>Code</td>
    </div>
  </tr>
</table>
```
So as you can see that wrapping the ```<td>``` tags in a div element breaks the table parent-child relationship. For things to work as expected, the ```<td>``` tags have to be rendered individually without wrapping them in a div element.

## 6.  Give 3 examples of the HOC pattern.
Higher Order Components (HOC) is a design pattern in React that involves wrapping a component with a function to enhance its capabilities.

1. Authentication HOC:
```
import React, { useState, useEffect } from 'react';

const withAuthentication = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      // Logic to check if user is authenticated
      // Update isAuthenticated state accordingly
    }, []);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <p>Please log in to access this component.</p>;
    }
  };
};

// Usage
const AuthenticatedComponent = withAuthentication(SomeComponent);
```

2. Logging HOC using Hooks:

```
import React, { useEffect } from 'react';

const withLogging = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      console.log(`Component ${WrappedComponent.name} is mounted.`);

      return () => {
        console.log(`Component ${WrappedComponent.name} is unmounted.`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

// Usage
const LoggedComponent = withLogging(SomeComponent);
```

3. Data Fetching HOC using Hooks:

```
import React, { useState, useEffect } from 'react';

const withDataFetching = (url) => (WrappedComponent) => {
  return (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Fetch data from the provided URL
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, [url]);

    return (
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <WrappedComponent data={data} {...props} />
        )}
      </div>
    );
  };
};

// Usage
const DataComponent = withDataFetching("https://fakestoreapi.com/products")(SomeComponent);
```

## 7. What's the difference in handling exceptions in promises, callbacks and async…await

Promise, Callback and async/await are all different ways to handle asynchronous operations in JavaScript.

Promise:
 - Built-in error handling with ```.catch``` method.
 - Slightly more complex to understand compared to callbacks.
Callbacks:
 - No built-in mechanism for error handling.
 -  Can handle multiple asynchronous operations in parallel.
Async/Await: 
 - Built-in error handling with try-catch blocks.
 - Can be used with promises and async functions.
 - Only supported in modern browsers and Node.js environments.

## 8. How many arguments does setState take and why is it async.

setState is used in class based component it accepts 2 arguments i.e nextState and callback 
- nextState is Either an object or a function.
- callback is an optional If specified, React will call the callback you’ve provided after the update is committed.

setState is asynchronous
setState asynchronously because it can result in an expensive operation. Making it synchronous might leave the browser unresponsive. Asynchronous setState calls are batched to provide a better user experience and performance

This is why you don’t see the new values in state right after you updated it.

## 9. List the steps needed to migrate a Class to Function Component.

1. Change the class to a function
```
class MyComponent extends React.Component {
  //...
}
```
to
```
function MyComponent(props) {
  //...
}
```
2. Remove the render method
Remove the render method, but keep everything after & including the return. Make this the last statement in your function.

```
  render() {
    return (<p>Hello, World</p>);
  }
```
To this

```
function MyComponent(props) { 
  return (<p>Hello, World</p>);
} // end of function
```

3. Convert all methods to functions Class methods won’t work inside a function, so convert them all to functions.

4. Remove references to this. The this variable in the function isn’t going to be useful any more. Remove the references to it throughout render and functions.

5. Remove constructor Simply removing the constructor is a little tricky.

```
constructor(props) {
  super(props);
  this.state = {
    counter: 0,
    name: ""
  }
}
```
Use the useState hook
```
function MyComponent(props) {
  const [counter,setCounter] = useState(0);
  const [name,setName] = useState("");
}
```

6. Remove event handler bindings We don’t need to bind event handlers any more with function components.

7. Replace this.setState
this.setState obviously doesn’t exist any more in the function component. Instead we need to replace each of the setState calls with the relevant state variable setter.

8. useEffect for state update side effects
In a class component, this.setState could accept a callback that would run after the state was updated. Well, the useState updater function does no such thing. Instead we have to use the useEffect hook. It doesn’t work exactly the same though! useEffect will trigger whenever one of it’s dependencies are changed.

9. Replace lifecycle methods with hooks

- Instead of using the componentDidMount method, use the useEffect hook with an empty dependency array.
```
useEffect(()=>{
  console.log('component mounted!')
},[])
```
- Instead of using the componentWillUnmount method to do cleanup before a component is removed from the React tree, return a function from the useEffect hook with an empty dependency array
```
useEffect(() => {
  console.log('component mounted')
  // return a function to execute at unmount
  return () => {
    console.log('component will unmount')
  }
}, [])
```
- If you pass nothing as the second argument to useEffect, it will trigger whenever a component is updated. So instead of using componentDidUpdate

```
useEffect(() => {
  console.log('component updated!')
})
```

## 10. List a few ways styles can be used with components

There are many different ways to style React JS components, there names and explanations of some of them are mentioned below.

- Normal CSS
- CSS in JS
- Styled Components(https://styled-components.com/)
- CSS module
- Sass & SCSS(https://sass-lang.com/guide/)
- Less(https://lesscss.org/)

## 11. How to render an HTML string coming from the server

dangerouslySetInnerHTML: An object of the form { __html: '<p>some html</p>' } with a raw HTML string inside. Overrides the innerHTML property of the DOM node and displays the passed HTML inside. 

```
<div dangerouslySetInnerHTML={{__html: '<strong>strong text</strong>'}} />
```