import React, { Component } from "react";

class UsersAdmin extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            users: [],
            showFormUser: false,
            idUser: -1,
            name: "",
            nickname: "",
            password: "",
            msgSaveUser: "",
            nameUser: ""
        };
        const year = new Date().getFullYear();
        this.years = Array.from(new Array(133), (val, index) => year - index);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    nameUser(name, id) {
        this.setState({ nameUser: name, idUser: id });
    }
    onChangeUser(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    getAllUsers() {
        let promesa = fetch("http://127.0.0.1:8000/api/users/all");

        promesa
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data
                });
            });
    }

    componentDidMount() {
        this.getAllUsers();
    }

    newUser() {
        this.getAllUsers();
        this.setState({
            showFormUser: !this.state.showFormUser,
            idUser: -1,
            name: "",
            nickname: "",
            password: ""
        });
    }

    saveUser(data) {
        let save = fetch("http://127.0.0.1:8000/api/users/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return save;
    }

    updateUser(data) {
        let update = fetch("http://127.0.0.1:8000/api/users/update", {
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
        const { idUser, name, nickname, password } = this.state;

        if (idUser <= 0) {
            const data = {
                name: name,
                nickname: nickname,
                password: password
            };
            let save = this.saveUser(data);
            save.then(response => response.json()).then(data => {
                if (typeof data.success !== "undefined") {
                    this.setState({
                        msgSaveUser: data.success,
                        name: "",
                        nickname: "",
                        password: ""
                    });
                } else if (typeof data.error !== "undefined") {
                    this.setState({
                        msgSaveUser: data.error
                    });
                }
            });
        } else if (idUser > 0) {
            const data = {
                id: idUser,
                name: name,
                nickname: nickname,
                password: password
            };
            let update = this.updateUser(data);
            update
                .then(response => response.json())
                .then(data => {
                    if (typeof data.success !== "undefined") {
                        this.setState({
                            msgSaveUser: data.success
                        });
                    } else if (typeof data.error !== "undefined") {
                        this.setState({
                            msgSaveUser: data.error
                        });
                    }
                });
        }
    }
    getUser(id) {
        let get = fetch(`http://127.0.0.1:8000/api/users/show/${id}`, {
            method: "GET"
        });
        get.then(response => response.json()).then(data => {
            this.setState({
                showFormUser: true,
                name: data.name,
                nickname: data.nickname,
                password: data.password,
                idUser: data.id
            });
        });
    }

    deleteUser() {
        let deleted = fetch(
            `http://127.0.0.1:8000/api/users/delete/${this.state.idUser}`,
            {
                method: "DELETE"
            }
        );
        deleted
            .then(response => response.json())
            .then(data => {
                this.getAllUsers();
            });
    }

    render() {
        const { name, nickname, password } = this.state;
        const { showFormUser } = this.state;
        const formMovie = showFormUser ? (
            <div className="newUser">
                <h2>{this.state.msgSaveUser}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            id="name"
                            name="name"
                            onChange={e => {
                                {
                                    this.onChangeUser(e);
                                }
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nickname">Nickname</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nickname}
                            id="nickname"
                            name="nickname"
                            onChange={e => {
                                {
                                    this.onChangeUser(e);
                                }
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            id="password"
                            name="password"
                            onChange={e => {
                                {
                                    this.onChangeUser(e);
                                }
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>
                </form>
            </div>
        ) : (
            ""
        );
        const tableMovies = !showFormUser ? (
            <div className="dataMovies">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Nickname</th>
                            <th scope="col">Rol</th>

                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => {
                            return (
                                <tr key={movie.id}>
                                    <td>{movie.id}</td>
                                    <td>{movie.name}</td>
                                    <td>{movie.nickname}</td>
                                    <td>{movie.rol}</td>

                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-success"
                                                            onClick={() => {
                                                                this.getUser(
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
                                                            data-target="#deleteUser"
                                                            onClick={() => {
                                                                this.nameUser(
                                                                    movie.name,
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
        const textButtonMovie = !showFormUser ? "Nuevo Usuario" : "Volver";

        return (
            <div>
                <div
                    className="modal fade"
                    id="deleteUser"
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
                                    Eliminar usuario
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
                                Seguro que desea eliminar el usuario:
                                <h3>
                                    <b>{this.state.nameUser}</b>
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
                                        this.deleteUser();
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
                            this.newUser();
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
export default UsersAdmin;
