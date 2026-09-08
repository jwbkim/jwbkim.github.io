# Media sources

Prepared on 2026-09-08 from the researcher’s existing website and project websites. All visual content is original source material; no generated imagery, retouching, or alteration of scientific content was used. Video excerpts retain the original framing, annotations, and existing speed-ups. Audio is omitted for silent inline previews.

## Portrait

- Page: https://sites.google.com/view/jkimrobot/home
- Exact image URL: https://lh3.googleusercontent.com/sitesv/AG8ngQW-D6lzTGzZfxcAkcc9zvQGeUrqvAmU306kzIXEs9QXQXeVQnr2YnQEZAWbKfNFUO-wYNEbqfYpdmkEJtA9z5y1guKiEJjf6YTEM6ndZnR4j6OXE9azjs8lvmA1AJYNNRd-57g5DP0e3xcYkYihhN682uWb3RBofMX_1kFEbM_8mL3aQnEH1h4ivNMt8czaBqGlrxu65-_WSh0gK6Dnb-1Gj_BP0YrJj-215HXX=w1280
- Local file: `public/media/portrait.webp`
- Original dimensions retained: 347 × 450 pixels. Source JPEG: 33,415 bytes; optimized WebP: 22194 bytes.

## Research previews

All previews are 12-second H.264 MP4 files, 960 × 540 pixels, 24 fps, YUV420p, with fast-start metadata. WebP posters are extracted from the same source video at the times listed below. Research playback speed is inherited from the original footage and its annotations, not altered here.

| Local asset | Exact original URL | Original excerpt | Poster time in original | MP4 bytes | WebP bytes |
| --- | --- | --- | --- | ---: | ---: |
| `ego-pi.mp4` / `ego-pi.webp` | https://egopipaper.github.io/resources/egopi_summary_faster.mp4 | 00:03–00:15 | 00:10 | 901,435 | 34,150 |
| `srt-h.mp4` / `srt-h.webp` | https://h-surgical-robot-transformer.github.io/resources/tasks_srt_h/chole_teaser_landscape_comp_more.mp4 | 00:23–00:35 | 00:28 | 585,034 | 37,214 |
| `srt.mp4` / `srt.webp` | https://surgical-robot-transformer.github.io/resources/tasks/teaser.mp4 | 00:14.5–00:26.5 | 00:19 | 1,023,436 | 32,742 |

### Content descriptions

- **Ego-Pi:** human tomato-sorting demonstration, followed by a humanoid robot sorting tomatoes by color. The original video describes transfer of sorting logic from human data. The robot portion is labeled autonomous, 5×.
- **SRT-H:** autonomous recovery behavior during tissue manipulation, including language instructions overlaid on the original footage. This is ex vivo surgical research using animal tissue; the project page supplies experimental context. The original footage is labeled autonomous, 6×.
- **SRT:** autonomous knot tying with a disturbance on a surgical training pad, followed by needle-pickup recovery. Original annotations include 10× and 6× speed.

### Project pages

- Ego-Pi: https://egopipaper.github.io/
- SRT-H: https://h-surgical-robot-transformer.github.io/
- Surgical Robot Transformer: https://surgical-robot-transformer.github.io/

## Verification

Each final MP4 was inspected with `ffprobe`, and decoded fully with `ffmpeg -v error -i FILE -f null -`. All frames decoded without errors. Posters and portrait were visually inspected. Combined shipped media is approximately 2.64 MB (decimal). Source originals were downloaded into `/tmp` and are not shipped with the site.

## Reproduce a preview

```sh
ffmpeg -ss START -i SOURCE.mp4 -t 12 -map 0:v:0 -map_metadata -1 -map_chapters -1 -an -sn \
  -vf "scale=960:-2,fps=24" -c:v libx264 -preset medium -crf 25 \
  -pix_fmt yuv420p -movflags +faststart OUTPUT.mp4
ffmpeg -ss POSTER_TIME -i SOURCE.mp4 -frames:v 1 -vf "scale=960:-2" \
  -c:v libwebp -quality 84 OUTPUT.webp
```

## Curriculum vitae

- Local file: `public/cv.pdf`
- Source: https://raw.githack.com/jkim447/cv_stuff/main/Brian_Kim_CV_August_2026.pdf
- Downloaded 2026-09-08; copied from the verified content-migration download.
- August 2026 CV; unmodified PDF, six A4 pages, 98,521 bytes.
- Verified with `pdfinfo`: PDF 1.5, six pages, unencrypted, no embedded JavaScript.
- SHA-256: `d78e6d715d516e525a779ebd691491168e4be40ce25c44de8e738383b9f907dd`.
- The local copy provides a stable download. Replace this file when publishing a newer CV.

## Science Robotics cover

- Local file: `public/media/science-robotics-cover.webp`
- Original page: https://sites.google.com/view/jkimrobot/home
- Exact image URL: https://lh3.googleusercontent.com/sitesv/AG8ngQVlYOvCrCBb_ykdRqgX_7sHgCOHb7VcgRQ1tOIpLD4rt2uN11qQmGRhtzrb_dDojhAYwcjLnD-unKT9AmYdhwnv38OPhZ3M9VheJqsUupJKnPMJtoayRNWXTQKBSDhRgC05NSzSwnyGXvxnil9wdZllgQXXWJFvPDo1IM8c0-Rrh34zFoqU6S8oqRPW7pvUw8jJUydujwJRNmhieVnkImq93VloBKh6X7R0CMod8CA=w1280
- The genuine July 2025 Science Robotics cover, visually verified by its printed issue date and masthead; copied from the SRT-H section of the original homepage.
- Source: PNG, 1250 × 1494 pixels, 1280078 bytes.
- Optimized local asset: WebP, 625 × 747 pixels, 34334 bytes. Full composition retained with no crop, retouching, or generated elements.

## Personal video embeds

Exact YouTube IDs were extracted from the two original iframe elements at https://sites.google.com/view/jkimrobot/personal on 2026-09-08. No video files were downloaded or rehosted. `src/data/personal.ts` uses YouTube’s privacy-enhanced embed hostname and retains direct watch links.

| Subject | Original embedded title | Exact video ID | Watch URL |
| --- | --- | --- | --- |
| Saxophone at Peabody Conservatory | Decruck Sonata I -- Alto Saxophone | `7zU3cEs7VcA` | https://www.youtube.com/watch?v=7zU3cEs7VcA |
| RC drifting, driven by the researcher | drift underground arena 2023 short version no music | `VMiKeFk-i-0` | https://www.youtube.com/watch?v=VMiKeFk-i-0 |

Descriptions follow the original personal page’s visible captions, without adding dates, venues, collaborators, or achievements that the page does not state.

## Personal video posters

Official YouTube thumbnails were downloaded from the exact original video IDs on 2026-09-08, visually inspected, and compressed to WebP without changing composition. Both originals are 1280 × 720; local posters are 960 × 540. No video content was downloaded.

| Local poster | Official thumbnail URL | Bytes |
| --- | --- | ---: |
| `public/media/personal-saxophone.webp` | https://i.ytimg.com/vi/7zU3cEs7VcA/maxresdefault.jpg | 34,826 |
| `public/media/personal-rc-drifting.webp` | https://i.ytimg.com/vi/VMiKeFk-i-0/maxresdefault.jpg | 23,742 |

The saxophone poster shows the stage performance with piano; the RC drifting poster shows a green model car on the course. These provide immediate local previews before the embedded player is loaded.
