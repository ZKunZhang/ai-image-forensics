import test from 'node:test';
import assert from 'node:assert/strict';

import { bytesToString, formatSize, sha256 } from '../src/utils.js';

test('formatSize formats byte boundaries', () => {
    assert.equal(formatSize(0), '0 B');
    assert.equal(formatSize(1023), '1023 B');
    assert.equal(formatSize(1024), '1.00 KB');
    assert.equal(formatSize(1048576), '1.00 MB');
});

test('bytesToString handles data larger than one chunk', () => {
    const bytes = new Uint8Array(70000).fill(65);
    const text = bytesToString(bytes);
    assert.equal(text.length, 70000);
    assert.equal(text.slice(0, 3), 'AAA');
    assert.equal(text.slice(-3), 'AAA');
});

test('sha256 fallback matches a standard test vector', async () => {
    const previousWindow = globalThis.window;
    globalThis.window = {};
    try {
        const input = new TextEncoder().encode('abc');
        assert.equal(
            await sha256(input.buffer),
            'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
        );
    } finally {
        if (previousWindow === undefined) delete globalThis.window;
        else globalThis.window = previousWindow;
    }
});
