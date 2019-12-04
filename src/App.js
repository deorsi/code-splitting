import React, { Component, Suspense } from "react";
import Page1 from "./Components/Page1";
import "./App.css";

// no code splitting
// import Page2 from "./Components/Page2";
// import Page3 from "./Components/Page3";

// clear code splitting
// import AsyncComponent from './AsyncComponent';

// react lazy splitting
const Page2Lazy = React.lazy(() => import("./Components/Page2"));
const Page3Lazy = React.lazy(() => import("./Components/Page3"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "page1",
      // code splitting manual and clear
      component: null
    };
  }

  onRouteChange = route => {
    // no code splitting
    this.setState({ route: route });

    // with code splitting - manual
    // if (route === "page1") {
    //   this.setState({ route: route });
    // } else if (route === "page2") {
    //   import("./Components/Page2").then(Page2 => {
    //     this.setState({ route: route, component: Page2.default });
    //   })
    // } else if (route === "page3") {
    //   import("./Components/Page3").then(Page3 => {
    //     this.setState({ route: route, component: Page3.default });
    //   })
    // }
  };

  render() {
    // no code splitting
    // if (this.state.route === "page1") {
    //   return <Page1 onRouteChange={this.onRouteChange} />;
    // } else if (this.state.route === "page2") {
    //   return <Page2 onRouteChange={this.onRouteChange} />;
    // } else if (this.state.route === "page3") {
    //   return <Page3 onRouteChange={this.onRouteChange} />;
    // }

    // manual code splitting
    // if (this.state.route === "page1") {
    //   return <Page1 onRouteChange={this.onRouteChange} />;
    // } else {
    //   return <this.route.component onRouteChange={this.onRouteChange} />;
    // }

    // cleaner code splitting
    // if (this.state.route === 'page1') {
    //   return <Page1 onRouteChange={this.onRouteChange} />
    // } else if (this.state.route === 'page2') {
    //   const AsyncPage2 = AsyncComponent(() => import("./Components/Page2"));
    //   return <AsyncPage2 onRouteChange={this.onRouteChange} />
    // } else {
    //   const AsyncPage3 = AsyncComponent(() => import("./Components/Page3"));
    //   return <AsyncPage3 onRouteChange={this.onRouteChange} />
    // }

    // code splitting react.lazy
    if (this.state.route === "page1") {
      return <Page1 onRouteChange={this.onRouteChange} />;
    } else if (this.state.route === "page2") {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Page2Lazy onRouteChange={this.onRouteChange} />
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Page3Lazy onRouteChange={this.onRouteChange} />
        </Suspense>
      );
    }
  }
}

export default App;
