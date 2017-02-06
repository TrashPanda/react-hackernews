## React hackernews

A hackernews client built with react/redux/rx/sass


<p align="center">
  <a href="http://grave-digger-edward-54646.netlify.com/">View App</a>
</p>

## Overview

This app is built mainly upon React/Redux/Rxjs/react-router/sass. In the following section I will go through how this stack works.

### Manage view with React

In order to make view components reusable and flexible, local state should be kept at minimal. Although local state could still exist, shared state between components is a sign that this state should reside in the store(here we use redux store). Separate container and presentational components, so that presentational components can act like pure renderers while containers handle app state, logic and pass down props to renderers. This organisation also makes testing and refactor easier.

On a side note, compare React to other frameworks like Angular/Angular2/vue/ember, and the key difference that React is only a view library which requires many other tools in order to build a complete app. While they aim to solve similar problem in the grand scheme, the choice of the tools is not about dependant on the scope of the project.

### Manage application state with Redux

Redux is a state container, and a good replacement for flux pattern. One of the main pain point of flux is when dealing with multiple async source flux itself doesn't enforce single or multiple store. Redux improved on this aspect by using a single state tree which holds the references and history of all the states. If we strip down React/redux to their core functionality, we have redux handling business logic while React acts like a renderer function. In a way it's similar how modern graphic api like dx12/vulkan works, which are mostly stateless. This structure could even naturally give rise to a dual thread model, where we put ui renderer and logic in separate threads to increase the performance. Redux also has the bonus of bringing time travel functionality to the app, where the state history of the app can be saved and replayed.  However, Redux itself is synchronous. How does it deal with asynchronous operations? This brings the next point.

### Manage async with Rxjs/redux-observable

There are mainly 2 categories of tools deals with async problems. In redux, normally action creator are pure functions which don't dispatch themselves. They simply return an action object with action type and payload data. Middlewares like redux-thunk let action creators to utilize higher order function to return a function instead, so that async logic and dispatch could be done in the returned function. In the this approach, action creator functions are no longer pure. In the second approach, the middlewares like redux-observable/redux-saga runs like a separate parallel system monitoring incoming and outgoing actions. Redux is not aware of any async operations, instead it dispatch actions which tells the middleware that 'some async operations are going to happen'. The middleware then carry out the async operations with unknown process time. When it's done, it send back actions to pass the result(or failure) to Redux. In this way, React/Redux system stays pure, and communicates with the async world with middleware. The main difference between redux-saga and redux-observable is that, saga utilizes promises and generator function while redux-observable uses observables and rxjs. Interestingly, both of them have root in iterator pattern. Most of these tools are good enough in solving common cases, pick one.

### Manage routing with react-router

react-router is a popular package for react but I feel that it is still kind of restricted. For example, in react-router routes have to be declared at the root component and they have to follow the hierarchy of the structure instead of being composable. There is also no regex support. What I did here is to make component capable of reacting to the incoming route parameters. So that every time there is a initialization or change of route, the corresponding  components act accordingly. In this way the components become very flexible since the only arguments I need is the route value passing down from the props. Avoiding hammering the router api into the app is a big bonus in my opinion, and it can be easily replaced with better router if needed. But for the time being, I feel that this solution is good enough.

### What's next..

Our app is beginning to be in the decent shape, but we could improve the project even further. For example:
* use selector library to utilize memoization and reduce redundant computation
* split the code with webpack
* add gradual typing with flow or refactor with Typescript
* add unit testing with libraries like Jest
* put logic in web worker thread to keep it from blocking ui in the main thread as mentioned before

Stick to the good practices, keep the ui components/states/asynce operation well organized, this architecture would be able to scale with reasonably good performance even we continuously add more components and complex logic.
