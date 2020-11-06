/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//require("./components/index");
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MoviesList from "./components/user/index";
import MainAdmin from "./components/index";

if (document.getElementById("main-admin")) {
    ReactDOM.render(<MainAdmin />, document.getElementById("main-admin"));
} else if (document.getElementById("movies")) {
    ReactDOM.render(<MoviesList />, document.getElementById("movies"));
}
