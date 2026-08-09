<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
          return [
            'id' => $this->id,
            'title' => $this->title,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'slug' => $this->slug,
            'body' => $this->body,
            'status' => $this->status,
            'featured_image' => $this->getFirstMediaUrl('featured') ?: null,
            'featured_image_thumb' => $this->getFirstMediaUrl('featured', 'thumb') ?: null,
            'author' => $this->user->name,
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
