<?php

use App\Http\Controllers\CodeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function(){
    Route::get('/', [CodeController::class, 'index'])->name('welcome');
    Route::put('/store', [CodeController::class, 'store'])->name('store');    
    Route::patch('/update/{id}', [CodeController::class, 'update'])->name('update');
    Route::delete('/destroy/{id}', [CodeController::class, 'destroy'])->name('destroy');
});



require __DIR__.'/auth.php';
