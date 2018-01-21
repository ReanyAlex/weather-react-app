import React, { Component } from 'react';

class Search extends Component {
  state = {
    searchValue: ''
  };

  onSubmit(event) {
    event.preventDefault();
    this.props.searchLocation(this.state.searchValue);
  }

  renderSearchError() {
    return this.props.searchError ? (
      <p className="searchError">Something went wrong with the search. Please make sure to use the City and State.</p>
    ) : (
      ''
    );
  }

  render() {
    return (
      <div className="header">
        <form className="wrapper" onSubmit={e => this.onSubmit(e)}>
          <label htmlFor="zipCode">Search Weather by City and State or Zip Code</label>
          <input
            onChange={e => {
              this.setState({ searchValue: e.target.value });
            }}
            type="text"
            name="zipCode"
            value={this.state.searchValue}
            id="location"
          />
          <input type="submit" value="Search" name="button" id="locationSearch" />
        </form>
        {this.renderSearchError()}
      </div>
    );
  }
}

export default Search;
