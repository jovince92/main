<?php
namespace Database\Seeders;

use App\Models\Code;
use App\Models\User;
use Illuminate\Database\Seeder;

class CodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $iso_3166 = [
            "Americas" => [
                "North America" => [
                    "Central America" => [
                        "BZ" => "Belize",
                        "CR" => "Costa Rica",
                        "SV" => "El Salvador",
                        "GT" => "Guatemala",
                        "HN" => "Honduras",
                        "NI" => "Nicaragua",
                        "PA" => "Panama",
                    ],
                    "Caribbean" => [
                        "AG" => "Antigua and Barbuda",
                        "BS" => "Bahamas",
                        "BB" => "Barbados",
                        "CU" => "Cuba",
                        "DM" => "Dominica",
                        "DO" => "Dominican Republic",
                        "GD" => "Grenada",
                        "HT" => "Haiti",
                        "JM" => "Jamaica",
                        "KN" => "Saint Kitts and Nevis",
                        "LC" => "Saint Lucia",
                        "VC" => "Saint Vincent and the Grenadines",
                        "TT" => "Trinidad and Tobago",
                    ],
                ],
                "South America" => [
                    "AR" => "Argentina",
                    "BO" => "Bolivia",
                    "BR" => "Brazil",
                    "CL" => "Chile",
                    "CO" => "Colombia",
                    "EC" => "Ecuador",
                    "GY" => "Guyana",
                    "PY" => "Paraguay",
                    "PE" => "Peru",
                    "SR" => "Suriname",
                    "UY" => "Uruguay",
                    "VE" => "Venezuela",
                ],
            ],
            // Add other continents and their regions here
        ];

        $user = User::first();
        $iso = Code::create([
            'name' => 'ISO 3166',
            'user_id' => $user->id,
        ]);
        foreach ($iso_3166 as $continent => $regions) {
            $continentCode = Code::create([
                'name' => $continent,
                'parent_id' => $iso->id,
                'head_id' => $iso->id,
                'user_id' => $user->id,
            ]);

            foreach ($regions as $region => $subRegions) {
                $regionCode = Code::create([
                    'name' => $region,
                    'parent_id' => $continentCode->id,
                    'head_id' => $continentCode->id,
                    'user_id' => $user->id,
                ]);

                foreach ($subRegions as $subRegion => $countries) {
                    if (is_array($countries)) {
                        $subRegionCode = Code::create([
                            'name' => $subRegion,
                            'parent_id' => $regionCode->id,
                            'head_id' => $continentCode->id,
                            'user_id' => $user->id,
                        ]);

                        foreach ($countries as $code => $country) {
                            Code::create([
                                'name' => $country,
                                'code_1' => $code,
                                'parent_id' => $subRegionCode->id,
                                'head_id' => $continentCode->id,
                                'user_id' => $user->id,
                            ]);
                        }
                    } else {
                        Code::create([
                            'name' => $countries,
                            'code_1' => $subRegion,
                            'parent_id' => $regionCode->id,
                            'head_id' => $continentCode->id,
                            'user_id' => $user->id,
                        ]);
                    }
                }
            }
        }
    }
}