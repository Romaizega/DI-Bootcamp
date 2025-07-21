import React from 'react';

class App extends React.Component {
  state = {
    message: '',
    inputValue: '',
    serverResponse: ''
  };

  async componentDidMount() {
    try {
      const response = await fetch('/api/hello');
      const data = await response.text();
      this.setState({ message: data });
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: this.state.inputValue })
      });

      const text = await response.text();
      this.setState({ serverResponse: text });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>

        <h3><strong>Post to Server:</strong></h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>

        {this.state.serverResponse && (
          <h4>{this.state.serverResponse}</h4>
        )}
      </div>
    );
  }
}

export default App;


const express = require("express");
const app = express();

const PORT = 5000;

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.send("Hello From Express");
});

app.post('/api/world', (req, res) => {
  const { message } = req.body;

  console.log("Received from client:", message);

  res.send(`I received your POST request. This is what you sent me: ${message}`);
});

app.listen(PORT, () => {
  console.log(`The server running on port ${PORT}`);
});
