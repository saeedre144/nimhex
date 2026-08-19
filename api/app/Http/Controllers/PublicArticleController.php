<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use App\Models\Article;

class PublicArticleController extends Controller
{
    public function index()
    {
        $articles = Article::where('status', 'published')
            ->latest()
            ->paginate(9);

        return ArticleResource::collection($articles);
    }

    public function show(Article $article)
    {
        abort_unless($article->status === 'published', 404);

        return new ArticleResource($article);
    }
}