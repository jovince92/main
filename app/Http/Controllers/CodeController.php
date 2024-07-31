<?php

namespace App\Http\Controllers;

use App\Models\Code;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

class CodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Welcome');
    }

    

    /**
     * Store a newly created resource in storage.
     * 
     */
    public function store(Request $request)
    {
        $head_id = null;

        if ($request->parent_id) {
            $parent = Code::find($request->parent_id);
            $head_id = $parent->id;

            while ($parent->parent_id) {
                $parent = Code::find($parent->parent_id);
                $head_id = $parent->id;
            }
        }

        Code::create([
            'name' => $request->name,
            'head_id' => $head_id,
            'parent_id' => $request->parent_id ?? null,
            'user_id' => $request->user()->id,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $code = Code::findOrFail($id);
        $code->update([
            'name'=>$request->name,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $code = Code::findOrFail($id);
        $code->delete();
    }
}
