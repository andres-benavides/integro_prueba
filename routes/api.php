<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("movies/create", 'MoviesController@create');
Route::get("movies/all", 'MoviesController@all');
Route::get("movies/show/{id}", 'MoviesController@show');
Route::post("movies/update", 'MoviesController@update');
Route::delete("movies/delete/{id}", 'MoviesController@delete');

//USUARIOS
Route::post("users/create", 'UsersController@create');
Route::get("users/all", 'UsersController@all');
Route::get("users/show/{id}", 'UsersController@show');
Route::post("users/update", 'UsersController@update');
Route::delete("users/delete/{id}", 'UsersController@delete');

