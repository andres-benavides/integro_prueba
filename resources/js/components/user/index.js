import React, { Component } from "react";

class MoviesList extends Component {
    constructor() {
        super();
        this.state = {
            movies: []
        };
    }

    componentDidMount() {
        let promesa = fetch("http://127.0.0.1:8000/api/movies/all");

        promesa
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data
                });
            });
    }

    render() {
        return (
            <div className="container">
                <h1>Listado de peliculas</h1>
                {this.state.movies.map(movie => {
                    return (
                        <div className="row">
                            <div className="col-12">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target={"#movie-" + movie.id}
                                    aria-expanded="false"
                                    aria-controls={"movie-" + movie.id}
                                >
                                    {movie.titulo}
                                </button>
                                <div
                                    className="collapse"
                                    id={"movie-" + movie.id}
                                >
                                    <div className="card card-body">
                                        {movie.sinopsis}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
export default MoviesList;
