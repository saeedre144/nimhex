<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $articles = $request->user()->articles()
            ->latest()
            ->paginate(10);

        return ArticleResource::collection($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $article = $request->user()->articles()->create([
            ...$request->validated(),
            'slug' => Str::slug($request->title) . '-' . Str::random(6),
        ]);

        return new ArticleResource($article);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return new ArticleResource($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        $this->authorize('update', $article);

        $article->update($request->validated());

        return new ArticleResource($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);

        $article->delete();

        return response()->noContent();
    }
     public function uploadFeaturedImage(Request $request, Article $article)
    {
        $this->authorize('update', $article);

        $request->validate([
            'file' => ['required', 'image', 'max:5120'],
        ]);

        $article->clearMediaCollection('featured');
        $article->addMedia($request->file('file'))->toMediaCollection('featured');

        return response()->json([
            'url' => $article->getFirstMediaUrl('featured'),
            'thumb' => $article->getFirstMediaUrl('featured', 'thumb'),
        ]);
    }
}
