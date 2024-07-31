<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Create 100 top-level entities
        for ($i = 0; $i < 10; $i++) {
            $topLevelEntity = [
                'user_id' => User::all()->random()->id, 
                'head_id' => null,
                'parent_id' => null,
                'name' => $faker->firstName(),
                // 'code_1' => $faker->word,
                // 'code_2' => $faker->word,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $topLevelEntityId = DB::table('codes')->insertGetId($topLevelEntity);

            // Create random children for the top-level entity
            $this->createChildren($faker, $topLevelEntityId, $topLevelEntityId);
        }
    }

    /**
     * Recursively create children for a given parent entity.
     */
    private function createChildren($faker, $headId, $parentId, $depth = 0): void
    {
        // Limit the depth of the tree to avoid infinite recursion
        if ($depth > 5) {
            return;
        }

        // Create a random number of children (between 0 and 5)
        $numChildren = $faker->numberBetween(0, 5);

        for ($i = 0; $i < $numChildren; $i++) {
            $childEntity = [
                'user_id' => User::all()->random()->id, 
                'head_id' => $headId,
                'parent_id' => $parentId,
                'name' => $faker->firstName(),
                // 'code_1' => $faker->word,
                // 'code_2' => $faker->word,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $childEntityId = DB::table('codes')->insertGetId($childEntity);

            // Recursively create children for this child entity
            $this->createChildren($faker, $headId, $childEntityId, $depth + 1);
        }
    }
}