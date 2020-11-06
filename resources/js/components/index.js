import React, { Component } from "react";
import MoviesAdmin from "./admin/movies";
import UsersAdmin from "./admin/users";

class MainAdmin extends Component {
    constructor() {
        super();
        this.state = {};
    }

    showOptions(e) {
        let show = e.target.getAttribute("aria-controls");
        switch (show) {
            case "usuarios":
                $("#movies").removeClass("show");
                break;
            case "movies":
                $("#usuarios").removeClass("show");
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <button
                            className="btn btn-primary"
                            type="button"
                            data-toggle="collapse"
                            data-target="#usuarios"
                            aria-expanded="false"
                            aria-controls="usuarios"
                            onClick={e => {
                                this.showOptions(e);
                            }}
                        >
                            Usuarios
                        </button>
                    </div>

                    <div className="col-6">
                        <button
                            className="btn btn-primary"
                            type="button"
                            data-toggle="collapse"
                            data-target="#movies"
                            aria-expanded="false"
                            aria-controls="movies"
                            onClick={e => {
                                this.showOptions(e);
                            }}
                        >
                            Peliculas
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="collapse" id="movies">
                            <MoviesAdmin />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="dataUsets">
                            <div className="collapse" id="usuarios">
                                <UsersAdmin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MainAdmin;
