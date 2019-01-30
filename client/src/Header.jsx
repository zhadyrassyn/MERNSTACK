import React from 'react';

const links = [
  'Home',
  'Login',
  'Logout',
];

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            {links.map((link) => <li key={link}>{link}</li>)}
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;