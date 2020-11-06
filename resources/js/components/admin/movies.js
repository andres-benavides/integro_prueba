import React, { Component } from "react";

class MoviesAdmin extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            users: [],
            showFormMovie: false,
            idMovie: -1,
            titulo: "",
            sinopsis: "",
            anio: "",
            msgSaveMovie: "",
            nameMovie: "",
            alertType: ""
        };
        const year = new Date().getFullYear();
        this.years = Array.from(new Array(133), (val, index) => year - index);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    nameMovie(name, id) {
        this.setState({ nameMovie: name, idMovie: id });
    }
    onChangeMovie(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    getAllMovies() {
        let promesa = fetch("http://127.0.0.1:8000/api/movies/all");

        promesa
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data
                });
            });
    }

    componentDidMount() {
        this.getAllMovies();
    }

    newMovie() {
        this.getAllMovies();
        this.setState({
            showFormMovie: !this.state.showFormMovie,
            idMovie: -1,
            titulo: "",
            sinopsis: "",
            anio: ""
        });
    }

    saveMovie(data) {
        let save = fetch("http://127.0.0.1:8000/api/movies/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return save;
    }

    updateMovie(data) {
        let update = fetch("http://127.0.0.1:8000/api/movies/update", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return update;
    }

    handleSubmit(event) {
        event.preventDefault();
        const { idMovie, titulo, sinopsis, anio } = this.state;

        if (idMovie <= 0) {
            const data = {
                titulo: titulo,
                sinopsis: sinopsis,
                anio: anio
            };
            let save = this.saveMovie(data);
            save.then(response => response.json()).then(data => {
                if (typeof data.success !== "undefined") {
                    this.setState({
                        msgSaveMovie: data.success,
                        titulo: "",
                        sinopsis: "",
                        anio: "",
                        alertType: "success"
                    });
                } else if (typeof data.error !== "undefined") {
                    this.setState({
                        msgSaveMovie: data.error,
                        alertType: "error"
                    });
                }
            });
        } else if (idMovie > 0) {
            const data = {
                id: idMovie,
                titulo: titulo,
                sinopsis: sinopsis,
                anio: anio
            };
            let update = this.updateMovie(data);
            update
                .then(response => response.json())
                .then(data => {
                    if (typeof data.success !== "undefined") {
                        this.setState({
                            msgSaveMovie: data.success,
                            alertType: "success"
                        });
                    } else if (typeof data.error !== "undefined") {
                        this.setState({
                            msgSaveMovie: data.error,
                            alertType: "danger"
                        });
                    }
                });
        }
    }
    getMovie(id) {
        let get = fetch(`http://127.0.0.1:8000/api/movies/show/${id}`, {
            method: "GET"
        });
        get.then(response => response.json()).then(data => {
            this.setState({
                showFormMovie: true,
                titulo: data.titulo,
                sinopsis: data.sinopsis,
                anio: data.anio,
                idMovie: data.id
            });
        });
    }

    deleteMovie() {
        let deleted = fetch(
            `http://127.0.0.1:8000/api/movies/delete/${this.state.idMovie}`,
            {
                method: "DELETE"
            }
        );
        deleted
            .then(response => response.json())
            .then(data => {
                this.getAllMovies();
            });
    }

    render() {
        const { titulo, sinopsis, anio, alertType } = this.state;
        const { showFormMovie } = this.state;
        const formMovie = showFormMovie ? (
            <div className="newMovie">
                <div
                    className={
                        "alert alert-" +
                        alertType +
                        " alert-dismissible fade show"
                    }
                    role="alert"
                >
                    {this.state.msgSaveMovie}
                    <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titulo">Titulo</label>
                        <input
                            type="titulo"
                            className="form-control"
                            value={titulo}
                            id="titulo"
                            name="titulo"
                            onChange={e => {
                                {
                                    this.onChangeMovie(e);
                                }
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sinopsis">Sinopsis</label>
                        <textarea
                            className="form-control"
                            id="sinopsis"
                            name="sinopsis"
                            rows="3"
                            value={sinopsis}
                            onChange={e => {
                                {
                                    this.onChangeMovie(e);
                                }
                            }}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="anio">Año</label>
                        <select
                            className="form-control"
                            id="anio"
                            name="anio"
                            value={anio}
                            onChange={e => {
                                {
                                    this.onChangeMovie(e);
                                }
                            }}
                        >
                            <option value="">SELECCIONE</option>
                            {this.years.map((year, index) => {
                                return (
                                    <option key={`year${index}`} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>
                </form>
            </div>
        ) : (
            ""
        );
        const tableMovies = !showFormMovie ? (
            <div className="dataMovies">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Sinopsis</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => {
                            return (
                                <tr key={movie.id}>
                                    <td>{movie.id}</td>
                                    <td>{movie.titulo}</td>
                                    <td>{movie.sinopsis}</td>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-success"
                                                            onClick={() => {
                                                                this.getMovie(
                                                                    movie.id
                                                                );
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            data-toggle="modal"
                                                            data-target="#deleteMovie"
                                                            onClick={() => {
                                                                this.nameMovie(
                                                                    movie.titulo,
                                                                    movie.id
                                                                );
                                                            }}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        ) : (
            ""
        );
        const textButtonMovie = !showFormMovie ? "Nueva Pelicula" : "Volver";

        return (
            <div>
                <div
                    className="modal fade"
                    id="deleteMovie"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Eliminar pelicula
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Seguro que desea eliminar la pelicula:
                                <h3>
                                    <b>{this.state.nameMovie}</b>
                                </h3>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                    onClick={() => {
                                        this.deleteMovie();
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-header">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.newMovie();
                        }}
                    >
                        {textButtonMovie}
                    </button>
                </div>
                <div className="card card-body">
                    {tableMovies}
                    {formMovie}
                </div>
            </div>
        );
    }
}
export default MoviesAdmin;
