<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MediaController extends Controller
{
     public function store(Request $request)
    {
        $request->validate([
            'file' => ['required', 'image', 'max:5120'], // 5MB limit
        ]);

        // Standalone media, not yet attached to a specific article —
        // useful for inline editor images uploaded before the article is saved
        $media = $request->user()
            ->addMedia($request->file('file'))
            ->toMediaCollection('editor-uploads');

        return response()->json(['url' => $media->getUrl()]);
    }
}
