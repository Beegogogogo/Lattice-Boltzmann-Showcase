# Media Slot Guide

Place presentation media in this folder so the gallery can load it automatically.

## Supported filenames

Use the case slug with one of the supported extensions:

- `2d_taylor_green.mp4`
- `3d_taylor_green.mp4`
- `2d_poiseuille.mp4`
- `3d_poiseuille.mp4`
- `2d_driven_cavity.mp4`
- `3d_driven_cavity.mp4`

The loader also accepts `webm`, `gif`, and `png` for each slug.

## Preferred format

- Use `mp4` for most gallery entries because it is smaller and cleaner than GIF.
- Keep clips short, usually 4 to 12 seconds.
- Add captions, legends, or scalar bars before placing the media here.
- Later application sections can use new slugs such as `aneurysm_flow.mp4` or `particle_collision.mp4` after the page data is extended.

If no matching file exists, the page shows a built-in placeholder card instead.
