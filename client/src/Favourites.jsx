import React from 'react';
import {connect} from 'react-redux';

class Favourites extends React.Component {

  render() {
    const favouritesArray = this.props.favourites;
    return (
      <div>
        <ul>
          {favouritesArray.map(movie => {
            return (
              <li>{movie.id}, {movie.name}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favourites: state.favourites.favourites
  }
};

export default connect(mapStateToProps, null)(Favourites);