import React from 'react';

class Header extends React.Component {

  render() {
    console.log(this.props);
    const text = this.props.text;

    return (
      <header>
        <p>{text}</p>
        <nav>
          <ul>
            <li>Home</li>
            <li>Login</li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;