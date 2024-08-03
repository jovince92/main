<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiKeyMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $apiKey = $request->header('X-API-KEY');
        
        if (!$apiKey)  return response()->json(['error' => 'API key is missing'], 401);

        //Option 1: Check against .env value
        if ($apiKey !== env('API_KEY'))  return response()->json(['error' => 'Invalid API key'], 401);

        // Option 2: Check against database
        // $keyExists = DB::table('api_keys')->where('key', $apiKey)->exists();
        // if (!$keyExists) {
        //     return response()->json(['error' => 'Invalid API key'], 401);
        // }

        return $next($request);
    }
}

