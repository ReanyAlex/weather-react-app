import React, { Component } from 'react';

class Search extends Component {
  state = {
    searchValue: ''
  };

  onSubmit(event) {
    event.preventDefault();
    this.props.searchLocation(this.state.searchValue);
  }

  render() {
    return (
      <div>
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
        </div>
      </div>
    );
  }
}

export default Search;
