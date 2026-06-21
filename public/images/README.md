# Image directory

This folder holds the local WebP images referenced by `lib/images.ts`.

## Structure

```
public/images/
├── hero/
│   ├── 01.webp     <- HERO_CAROUSEL[0]
│   ├── 02.webp     <- HERO_CAROUSEL[1]
│   ├── 03.webp
│   ├── 04.webp
│   └── 05.webp
└── nurture/
    ├── 01.webp     <- NURTURE_CAROUSEL[0]
    ├── 02.webp
    ├── 03.webp
    ├── 04.webp
    └── 05.webp
```

## Updating images

1. Replace the .webp file at the matching index
2. If you change `alt` text, update `lib/images.ts`
3. Optimization: 1920px wide for hero, 1280px for secondary, quality 82

## Fallback behavior

If you delete a file or haven't added one yet, the site uses the
Cloudinary fallback URL in `lib/images.ts`. Either flip `USE_LOCAL_IMAGES`
to `false` in that file, or leave it `true` and add the files when ready.
