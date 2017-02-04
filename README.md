## React hackernews

A hackernews client built with react/redux/rx/sass


<p align="center">
  <a href="http://grave-digger-edward-54646.netlify.com/">View App</a>
</p>

## Technology Overview

This app is built mainly upon React/Redux/Rxjs/react-router. In the following section I will go through how to build scalable apps with this stack.

### React

In order to make view components reusable and flexable, local state should be kept at minimal. Although local state could still exist, shared state between componets is a good sign that this state should reside in the store(here we use redux store). Separation of container and presentational components, so that presentational components can act like pure renderers while containers handles controller logic and receiving state, or sometimes, local state. This organisation also makes testing and refactor easier.The key difference between React and Angular/Angular2/vue/ember is that React is only a view library which requires many other tools in order to build a complete app. While they aim to solve similar problem in the grand scheme, the choice is not about which is better but rather highly dependant on the project itself

### Redux

Redux is a good replacement for flux pattern. One of the main pain point of flux is when dealing with multiple async source since flux itself doesn't enforce single or multiple store. Redux improved on this aspect by using a single state tree which holds the references and history of all the states. 

### Rxjs
### react-router

react-router3 is a popular library for react but I feel that it is still restricted. For example, routes have to be declared at the root component and has to follow the rigid inheritance. There is no regex support. What I did here is that I wrote the React component to be reactive to the router arguments. So that every time there is a initialization or change of route, the corresponding  components react accordingly. In this way the components become very flexible since the only arguments I need is the route value passed to the props. Avoiding wristling with router api and app is a huge bonus in my opinion, and it can be easily replaced with better router if needed. But for the time being, I feel that this solution is good enough.
