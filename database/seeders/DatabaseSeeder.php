<?php

namespace Database\Seeders;

use App\Models\Code;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'username' => 'test',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        $nato_phonetic_alphabet = array(
            "A" => array("code_word" => "Alpha", "IPA" => "ˈælfə"),
            "B" => array("code_word" => "Bravo", "IPA" => "ˈbrɑːvoʊ"),
            "C" => array("code_word" => "Charlie", "IPA" => "ˈtʃɑːrli"),
            "D" => array("code_word" => "Delta", "IPA" => "ˈdɛltə"),
            "E" => array("code_word" => "Echo", "IPA" => "ˈɛkoʊ"),
            "F" => array("code_word" => "Foxtrot", "IPA" => "ˈfɒkstrɒt"),
            "G" => array("code_word" => "Golf", "IPA" => "ɡɒlf"),
            "H" => array("code_word" => "Hotel", "IPA" => "hoʊˈtɛl"),
            "I" => array("code_word" => "India", "IPA" => "ˈɪndiə"),
            "J" => array("code_word" => "Juliett", "IPA" => "ˌdʒuːliˈɛt"),
            "K" => array("code_word" => "Kilo", "IPA" => "ˈkiːloʊ"),
            "L" => array("code_word" => "Lima", "IPA" => "ˈliːmə"),
            "M" => array("code_word" => "Mike", "IPA" => "maɪk"),
            "N" => array("code_word" => "November", "IPA" => "noʊˈvɛmbər"),
            "O" => array("code_word" => "Oscar", "IPA" => "ˈɒskər"),
            "P" => array("code_word" => "Papa", "IPA" => "pəˈpɑː"),
            "Q" => array("code_word" => "Quebec", "IPA" => "kwɪˈbɛk"),
            "R" => array("code_word" => "Romeo", "IPA" => "ˈroʊmiˌoʊ"),
            "S" => array("code_word" => "Sierra", "IPA" => "siˈɛrə"),
            "T" => array("code_word" => "Tango", "IPA" => "ˈtæŋɡoʊ"),
            "U" => array("code_word" => "Uniform", "IPA" => "ˈjuːnɪfɔːrm"),
            "V" => array("code_word" => "Victor", "IPA" => "ˈvɪktər"),
            "W" => array("code_word" => "Whiskey", "IPA" => "ˈwɪski"),
            "X" => array("code_word" => "X-ray", "IPA" => "ˈɛksˌreɪ"),
            "Y" => array("code_word" => "Yankee", "IPA" => "ˈjæŋki"),
            "Z" => array("code_word" => "Zulu", "IPA" => "ˈzuːluː")
        );

        $top = Code::create([
            'name' => 'NATO Phonetic Alphabet',
            'user_id' => User::first()->id,
        ]);
        foreach($nato_phonetic_alphabet as $key => $value){
            $code = Code::create([
                'name' => $key,
                'code_1' => $value['code_word'],
                'code_2' => $value['IPA'],
                'parent_id' => $top->id,
                'head_id' => $top->id,
                'user_id' => User::first()->id,
            ]);
        }
    }
}
