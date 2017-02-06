## React hackernews

A hackernews client built with react/redux/rx/sass


<p align="center">
  <a href="http://grave-digger-edward-54646.netlify.com/">View App</a>
</p>

## Overview

This app is built mainly upon React/Redux/Rxjs/react-router. In the following section I will go through how this stack works.

### Manage view with React

In order to make view components reusable and flexable, local state should be kept at minimal. Although local state could still exist, shared state between componets is a sign that this state should reside in the store(here we use redux store). Separation of container and presentational components, so that presentational components can act like pure renderers while containers handles controller logic and receiving state, or sometimes, local state. This organisation also makes testing and refactor easier.
On a side note, compare React to other frameworks like Angular/Angular2/vue/ember, and the key difference that React is only a view module which requires many other tools in order to build a complete app. While they aim to solve similar problem in the grand scheme, the choice is not about which is better but rather dependant on the project itself.

### Manage model(store) with Redux

Redux is a good replacement for flux pattern. One of the main pain point of flux is when dealing with multiple async source since flux itself doesn't enforce single or multiple store. Redux improved on this aspect by using a single state tree which holds the references and history of all the states. If we strip down React/redux to their core functonality, we have redux handling business logic while React acts like a renderer function. In a way it's similar how modern graphic api dx12/vulkan works, which are mostly stateless. This structure could even be threaded, if we put logic in the web worker to seperate the logic and renderer to further improve the performance. Redux also has the bonus of bringing time travel functionality to the app, where the state history of the app can be saved and replayed.  However, Redux itself is synchronous. How does it deal with asynchrous operations? This brings the next point.

### Manage async with Rxjs/redux-observable

There are mainly 2 categories of tools deals with async problems. In redux, normally action creator are pure funcions which don't do dispatch themselves. They simply return an action object. Middewares like redux-thunk let action creators to uterlize higher order function to return a function instead, so that async logic and dispatch could be done in the returned function. In the first approach, action creator functions are no longer pure, that's not the case for the second approach. Instead, the middlewares like redux-observable/redux-saga runs like a seperate parallel system monitoring actions. So Redux is not aware of any async operations, instead it dispatch actions which tells the middleware that 'some async operations are going to happen'. The middleware do the async with unknown time. When it's done, it send back actions to pass the result(or failure). In this way, React/Redux system stays pure, communicates with the async world with middleware. The main difference between redux-saga and redux-observable is that, saga uterlizes prmoises and generator function while redux-observable uses observables and rxjs. Interestingly, both of them have root in iterator pattern. Most of these tools are good enough in solving common cases.

### Manage routing with react-router

react-router is a popular package for react but I feel that it is still kind of restricted. For example, routes have to be declared at the root component and they have to follow the hieirachy of the structure instead of being composable. There is no regex support. What I did here is that I wrote the React component to be reactive to the router arguments. So that every time there is a initialization or change of route, the corresponding  components act accordingly. In this way the components become very flexible since the only arguments I need is the route value passing down from the props. Avoiding hammering the router api into the app is a big bonus in my opinion, and it can be easily replaced with better router if needed. But for the time being, I feel that this solution is good enough.

### what's next
