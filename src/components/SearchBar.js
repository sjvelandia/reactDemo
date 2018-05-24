import React, {Component} from 'react';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            term: ''
        }
    }

    handleInputFilter(term) {
        this.setState({term});
        this.props.onTermChange(term);
    }

    render () {
        return (
            <input type="text"
                   className="filter-input"
                   placeholder="Search Title, Years, Location"
                   onChange={(event) => this.handleInputFilter(event.target.value)}/>
        );
    }
}

export default SearchBar;
