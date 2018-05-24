import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import SearchBar from './components/SearchBar';
import MoviesList from './components/MovieList';
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [], // the list to pass to movieList component
            startAtIndex: 0,
            unfilteredList: [],
            sortSelections: [],
            sortByTitle: true,
            sortByYear: true
        };
    }

    loadMovies(startIndex) {
        axios.get(`https://data.sfgov.org/resource/wwmu-gmzc.json?$limit=25&$offset=${startIndex}`)
            .then(response => {
                let currentList = this.state.unfilteredList;
                response.data.forEach(
                    movie => {
                        currentList.push(
                            {
                                ...movie, // distributes properties of the movies fetched
                                id: startIndex++
                            }
                        );

                    }
                );

                //update also the index to start next fetch at
                this.setState({movies: currentList, unfilteredList: currentList, startAtIndex: currentList.length + 1});
            })
            .catch(
                error => {
                    console.log(error);
                }
            );
    }

    componentWillMount() {
        this.loadMovies(0);
    }

    handleFilterSearch(term){
        if (term) {
            term = term.toLowerCase();

            let updatedList = this.state.unfilteredList;
            updatedList = updatedList.filter(function(item){
                // if any of the properties is undefined, pass empty string
                let title = item.title || '';
                let year = item.release_year || '';
                let location = item.locations || '';

                // filter by the items visible in card
                return  title.toLowerCase().startsWith(term) ||
                    year.toLowerCase().startsWith(term) ||
                    location.toLowerCase().startsWith(term) ;
            });

            this.setState({movies: updatedList});
        } else {
            // if the search field is empty, put back all the fetched data so far
            this.setState({movies: this.state.unfilteredList});
        }
    }

    handleSort = () => {
        const obj = [...this.state.movies];

        if(this.state.sortByYear) {
            obj.sort((a, b) => Number(a.release_year) - Number(b.release_year));
            this.setState({movies: obj});
        }

        if(this.state.sortByTitle) {
            obj.sort((a, b) => a.title - b.title);
            this.setState({movies: obj});
        }
    };

    toggleYearSort(event) {
        this.setState({
            sortByYear: !this.state.sortByYear
        });

        this.handleSort();

    }

    toggleTitleSort(event) {
        this.setState({
            sortByTitle: !this.state.sortByTitle
        });

        this.handleSort();
    }


    render() {

        const filterSearch = _.debounce(term => this.handleFilterSearch(term), 300);
    return (
        <div className="app-component">
            <div className="list-controls-box">
                <h1 className="header">Movies Filmed in SF</h1>
                <div className="controls-container">
                    <SearchBar onTermChange={filterSearch}/>

                    {/*<label>*/}
                    {/*<input*/}
                    {/*type="checkbox"*/}
                    {/*onClick={this.toggleYearSort.bind(this)}*/}
                    {/*/>*/}
                    {/*By Year*/}
                    {/*</label>*/}

                    {/*<label>*/}
                    {/*<input*/}
                    {/*type="checkbox"*/}
                    {/*onClick={this.toggleTitleSort.bind(this)}*/}
                    {/*/>*/}
                    {/*By Title*/}
                    {/*</label>*/}
                    <button className="more-button desktop-only"
                            onClick={() => this.loadMovies(this.state.startAtIndex)}>
                        load more
                    </button>
                </div>


            </div>

            <MoviesList movies={this.state.movies}/>
            <button className="more-button"
                    onClick={() => this.loadMovies(this.state.startAtIndex)}>
                load more
            </button>
        </div>
    );
  }
}

export default App;
