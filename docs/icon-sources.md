# Profile icon sources

`src/components/ProfileIcon.astro` embeds local SVG paths, so profile links have no remote-image or icon-package dependency. Paths retain their original view boxes. All icons inherit `currentColor`; the containing link supplies the visible text and accessible name.

| Icon | Source | License |
| --- | --- | --- |
| Google Scholar | [Simple Icons: googlescholar.svg](https://github.com/simple-icons/simple-icons/blob/develop/icons/googlescholar.svg), 24 × 24 view box | [CC0 1.0 Universal](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md) |
| GitHub | [Bootstrap Icons: github.svg](https://github.com/twbs/icons/blob/main/icons/github.svg), 16 × 16 view box | MIT, notice below |
| LinkedIn | [Bootstrap Icons: linkedin.svg](https://github.com/twbs/icons/blob/main/icons/linkedin.svg), 16 × 16 view box | MIT, notice below |
| X | [Bootstrap Icons: twitter-x.svg](https://github.com/twbs/icons/blob/main/icons/twitter-x.svg), 16 × 16 view box | MIT, notice below |
| CV | Original outlined page with folded corner and visible CV lettering, created for this site | Original site artwork |
| Email | Original outlined envelope, created for this site | Original site artwork |

The third-party SVG path data is unchanged. Only SVG wrapper attributes are adapted for sizing, color inheritance, and decorative accessibility. Brand names and marks identify the linked profiles; their trademarks remain with their respective owners.

## Bootstrap Icons license

Source: [Bootstrap Icons LICENSE](https://github.com/twbs/icons/blob/main/LICENSE).

```text
The MIT License (MIT)

Copyright (c) 2019-2024 The Bootstrap Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

## Simple Icons license

The Google Scholar path is distributed by Simple Icons under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/). The complete [Simple Icons license](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md) provides the copyright waiver and fallback public license. CC0 does not waive trademark rights.
