<?php

use App\Http\Controllers\BookController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//REST routes
/*
    GET /books              index
    GET /books/{id}         show
    XX GET /books/create       create XX
    POST /books             store
    XX GET /books/{id}/edit    edit XX
    PATCH   /books/{id}     update 
    DELETE  /books/{id}     delete
*/

//As an API, it shouldn't return forms for edition or creation

Route::apiResource('books', BookController::class);