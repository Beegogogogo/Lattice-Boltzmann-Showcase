# Lattice Boltzmann Showcase

This site for presenting validation cases, governing equations, and media exported from a lattice Boltzmann workflow.

## Purpose

This repository is the public-facing project page. It is meant for:

- short scientific explanations
- benchmark summaries
- videos or GIFs exported from simulation outputs
- figures that are safe to publish openly

The showcase repo is separate from the development repo so the solver source can remain private while the scientific story stays public.

## Site structure

```text
docs/
  index.html
  .nojekyll
  assets/
    site.css
    site.js
    media/
```

## Add a new case animation

1. Export a short MP4, WebM, GIF, or PNG from your post-processing workflow.
2. Place it in `docs/assets/media/` using the case slug as the filename.
3. Push the change to `master`.

Examples:

- `docs/assets/media/2d_taylor_green.mp4`
- `docs/assets/media/gaussian_hill.gif`
- `docs/assets/media/particle_sed2.png`

If a matching media file does not exist, the page shows a placeholder card automatically.

## Enable GitHub Pages

In the repository settings:

1. Open `Settings`
2. Open `Pages`
3. Set `Source` to `Deploy from a branch`
4. Select branch `master`
5. Select folder `/docs`

After deployment the site URL will be:

`https://beegogogogo.github.io/Lattice-Boltzmann-Showcase/`
