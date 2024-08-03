<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;
    protected $with = ['children'];
    protected $guarded = ['id', 'created_at', 'updated_at'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function head()
    {
        return $this->belongsTo(Code::class, 'head_id');
    }

    public function parent()
    {
        return $this->belongsTo(Code::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Code::class, 'parent_id')->whereNull('code_1')->whereNull('code_1');
    }

    public function items()
    {
        return $this->hasMany(Code::class, 'parent_id')->whereNotNull('code_1')->whereNotNull('code_1');
    }

    public function descendants()
    {
        return $this->hasMany(Code::class, 'head_id');
    }
}
