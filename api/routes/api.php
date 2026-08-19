<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PublicArticleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/ping', fn () => response()->json(['message' => 'hello from Laravel']));
// Route::get('/debug-users', fn () => \App\Models\User::all());


Route::get('/public/articles', [PublicArticleController::class, 'index']);
Route::get('/public/articles/{article:slug}', [PublicArticleController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    Route::apiResource('articles', ArticleController::class);
    Route::post('/articles/{article}/featured-image', [ArticleController::class, 'uploadFeaturedImage']);
    Route::post('/media', [MediaController::class, 'store']);
});