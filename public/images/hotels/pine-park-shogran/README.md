# Pine Park Hotel Shogran — photos

Drop the real photos from https://pineparkshogran.com/rooms/ into this folder,
then reference them in `lib/hotels.js` (the `pine-park-shogran` hotel).

## Per-room photos (power the clickable popup gallery)

Name files by room, e.g.:

```
standard-1.jpg  standard-2.jpg  standard-3.jpg
deluxe-1.jpg    deluxe-2.jpg
executive-1.jpg ...
family-suite-1.jpg ...
```

Then in `lib/hotels.js`, add them to each room's `photos` array:

```js
{ id: "standard", type: "room", name: "Standard Room", /* ... */
  photos: [
    "/images/hotels/pine-park-shogran/standard-1.jpg",
    "/images/hotels/pine-park-shogran/standard-2.jpg",
  ],
  description: "Short description of the room…",
},
```

The first photo becomes the room card image; clicking the room opens the popup
with the full gallery + a booking form for that room.

## Hotel-level gallery (optional)

Add a `photos` array on the hotel object itself to replace the illustrated
gallery tiles with real property photos:

```js
{ slug: "pine-park-shogran", /* ... */
  photos: [
    "/images/hotels/pine-park-shogran/property-1.jpg",
    "/images/hotels/pine-park-shogran/property-2.jpg",
  ],
}
```

Recommended: JP/WebP, landscape, ~1200px wide, each under ~400 KB.
