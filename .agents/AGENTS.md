# Repository Instructions

## Scope

AI Image Forensics is a zero-build browser application. Keep production code in native HTML, CSS, and ES Modules unless a dependency is clearly justified.

## Development

- Preserve the client-side privacy model: image bytes must not be uploaded or sent to analytics services.
- Keep Chinese and English strings synchronized through `src/i18n.js`.
- Maintain batch and single-image workflows when changing upload, analysis, or conversion behavior.
- Avoid committing generated output, local settings, credentials, or temporary images.
- Use concise commits authored as `zhaokun <zhaokun_zhang@icloud.com>`.

## Verification

- Run `npm test` for pure-module tests.
- Run `node --check` on changed JavaScript entry points.
- Run `git diff --check` before committing.
- Browser-facing changes should be checked through a local HTTP server because ES Modules and Web Workers do not run correctly through `file://`.

## Documentation

- Keep `README.md` and `README.en.md` aligned.
- Use `https://github.com/ZKunZhang/ai-image-forensics` for repository links.
- Use `https://zkunzhang.github.io/ai-image-forensics/` for GitHub Pages links.
