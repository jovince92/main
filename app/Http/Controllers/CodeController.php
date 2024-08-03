<?php

namespace App\Http\Controllers;

use App\Models\Code;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $id = $request->id;
        if(!$id) return Inertia::render('Welcome');
        $selectedCode = Code::with(['items'])->where('id',$id)->firstOrFail();
        $breadcrumb = $selectedCode ? $this->getBreadcrumb($selectedCode) : [];
        return Inertia::render('Welcome', [
            'selectedCode' => $selectedCode,
            'breadcrumb' => $breadcrumb,
        ]);
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
            'parent_id' => $request->parent_id,
            'code_1' => $request->code_1 ?? null,
            'code_2' => $request->code_2 ?? null,
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
            'code_1' => $request->code_1 ?? null,
            'code_2' => $request->code_2 ?? null,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $code = Code::findOrFail($id);
        $isItem = isset($code->code_1);
        $code->delete();
        if(!$isItem) return redirect()->route('welcome');

    }

    /**
     * Recursively fetch the parent entities.
     */
    private function getBreadcrumb($code)
    {
        $breadcrumb = [];
        while ($code) {
            $breadcrumb[] = [
                'id' => $code->id,
                'parent_id' => $code->parent_id,
                'name' => $code->name,
            ];
            $code = $code->parent;
        }
        return array_reverse($breadcrumb); // Reverse to get topmost entity first
    }
}
