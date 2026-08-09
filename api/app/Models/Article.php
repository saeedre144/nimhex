<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Article extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;
    use InteractsWithMedia;


    protected $fillable = [
        'title',
        'meta_title',
        'meta_description',
        'slug',
        'body',
        'status',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

     public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->fit(Fit::Crop, 400, 250)
            ->nonQueued(); // queued conversions need a queue worker running; skip that complexity for now

        $this->addMediaConversion('og')
            ->fit(Fit::Crop, 1200, 630) // standard Open Graph share-image size
            ->nonQueued();
    }
}
