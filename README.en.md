# AI Image Forensics

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-node--test-339933)](#tests)
[![Client-side](https://img.shields.io/badge/100%25-client--side-0071e3)](#)

[中文](README.md) · **English**

A browser-based toolkit for AI-image forensics and provenance analysis. It supports batch import, provenance-marker detection, metadata inspection, frequency analysis, and image conversion. Images remain on the local device and are never uploaded.

## Features

- Select or drop multiple PNG, JPEG, and WebP images and switch between them in a queue.
- Detect C2PA / Content Credentials and metadata markers left by common AI image tools.
- Inspect EXIF, XMP, IPTC, ICC, JUMBF, and related image information.
- Run heuristic analysis across 65 FFT, DCT, DWT, and pixel-domain features.
- Convert a batch with shared settings and download each processed image.
- Run entirely in the browser with no backend or image upload.

## Preview

![Detection view](docs/screenshots/main-light.svg)

![Conversion comparison](docs/screenshots/convert-demo.svg)

## Run locally

```bash
git clone https://github.com/ZKunZhang/ai-image-forensics.git
cd ai-image-forensics
python3 -m http.server 8000
```

Open <http://localhost:8000>. ES Modules and Web Workers require HTTP and will not load directly through `file://`.

## Tests

The project uses Node.js' built-in test runner and needs no third-party test framework:

```bash
npm test
```

Tests cover byte and size utilities, the SHA-256 fallback, and core FFT, DCT, and DWT pure functions.

## Technical notes

The project uses native HTML, CSS, and ES Modules with no build step. At runtime, `exifr` parses metadata and `piexifjs` writes EXIF; the remaining detection, frequency-transform, and UI logic lives in `src/`.

Frequency verdicts are heuristic guidance, not deterministic AI-image classification. Watermark-disruption and metadata-conversion capabilities are intended for privacy protection, compatibility testing, and academic research—not fraud, impersonation, or disinformation.

## Development

Repository-level development guidance is documented in [`.agents/AGENTS.md`](.agents/AGENTS.md).

## License

[MIT](LICENSE) © 2026 zhaokun
