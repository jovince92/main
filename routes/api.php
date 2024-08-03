<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::middleware(['api'])->prefix('v1')->group(function () {
    Route::get('/test', function (Request $request) {
        return response()->json(['message' => 'Hello World!']);
    });
});
