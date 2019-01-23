import React from 'react';
import Header from './Header';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000);
  }

  render() {
    console.log('123');
    const text = "Welcome message";
    const now = this.state.date.toLocaleTimeString();

    return (
      <div>
        {now}
        <Header text={text}/>

        <h1>My cool application</h1>
      </div>
    )
  }
}

export default App;