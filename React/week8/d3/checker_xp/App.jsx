import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import BuggyCounter from './components/BuggyCounter';
import Colors from './components/Colors';

function App() {
  return (
    <div className="App">
      <h2>Click on the numbers to increase the counters.</h2>
      <h2>The counter is programmed to throw error when it reaches 5. 
        This simulates a JavaScript error in a component.</h2>
      <p>
        These two counters are inside the same error boundary. 
        If one crashes, the error boundary will replace both of them.
      </p>
      <ErrorBoundary>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>

      <hr />

      <p>
        Each BuggyCounter has its own error boundary. 
        So if one crashes, the other is not affected.
      </p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>

      <hr />

      <p>
        This counter is not inside any error boundary. 
        So if it crashes, everything else will crash too
      </p>
      <BuggyCounter />
      <Colors/>
    </div>
  );
}

export default App;



import React, { Component } from 'react';

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error("I crashed!");
    }

    return (
      <h1 onClick={this.handleClick}>
        {this.state.counter}
      </h1>
    );
  }
}

export default BuggyCounter;



import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div style={{ border: '2px solid red', padding: '10px' }}>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;



import React, { Component } from "react";

class Colors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red",
      show: true
    };
  }

  componentDidMount () {
    setTimeout(()=> {
      this.setState ({favoriteColor: "yellow"})
    }, 1000)
  }

  componentDidUpdate() {
    console.log("after update");
  }
  
  getSnapshotBeforeUpdate (prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null
    
  }

  shouldComponentUpdate(prevProps, prevState) {
    return true; 
  }

  newFavoriteColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  deleteChild = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <h1>My favorite color is <i>{this.state.favoriteColor}</i></h1>
        <button onClick={this.newFavoriteColor}>Change color</button>
        {this.state.show && <Child />}
        <button onClick={this.deleteChild}>Delete</button>
      </div>
    );
  }
}

class Child extends Component {
  componentWillUnmount() {
    alert("did");
  }

  render() {
    return (
      <div>
        <h1>Something new</h1>
      </div>
    );
  }
}

export default Colors;
