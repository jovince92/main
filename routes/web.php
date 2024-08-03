<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CodeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['guest'])->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::get('/', [CodeController::class, 'index'])->name('welcome');

Route::middleware(['auth'])->group(function(){
    Route::put('/store', [CodeController::class, 'store'])->name('store');    
    Route::patch('/update/{id}', [CodeController::class, 'update'])->name('update');
    Route::delete('/destroy/{id}', [CodeController::class, 'destroy'])->name('destroy');
    Route::get('/test/', [CodeController::class, 'test'])->name('test');  
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});



// require __DIR__.'/auth.php';
