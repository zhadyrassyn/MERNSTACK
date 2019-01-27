import React from 'react';

const links = [
  'Home',
  'Login',
  'Logout',
];

class Header extends React.Component {

  handleClick(linkName) {
    this.props.handleReport(linkName);
  }

  render() {
    const text = this.props.text;

    return (
      <header>
        <p>{text}</p>
        <nav>
          <ul>
            {links.map((link) => <li key={link} onClick={this.handleClick.bind(this, link)}>{link}</li>)}
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;