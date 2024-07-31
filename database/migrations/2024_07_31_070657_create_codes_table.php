<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('codes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->unsignedBigInteger('head_id')->index()->nullable(); //references self, head of the tree i.e. top level entity
            $table->unsignedBigInteger('parent_id')->index()->nullable(); //references self, parent of the entity
            $table->string('name');
            $table->string('code_1')->nullable();
            $table->string('code_2')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('head_id')->references('id')->on('codes')->onDelete('cascade');
            $table->foreign('parent_id')->references('id')->on('codes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('codes');
    }
};
