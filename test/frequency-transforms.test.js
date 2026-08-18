import test from 'node:test';
import assert from 'node:assert/strict';

import { dct8, downsampleMag, fft1d, haar2d2level } from '../src/frequency/transforms.js';

function assertClose(actual, expected, epsilon = 1e-5) {
    assert.ok(Math.abs(actual - expected) <= epsilon, `${actual} is not within ${epsilon} of ${expected}`);
}

test('fft1d inverse restores the original signal', () => {
    const original = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8]);
    const re = new Float32Array(original);
    const im = new Float32Array(re.length);
    fft1d(re, im, 1);
    fft1d(re, im, -1);
    re.forEach((value, index) => assertClose(value, original[index]));
    im.forEach(value => assertClose(value, 0));
});

test('downsampleMag max-pools each region', () => {
    const source = new Float32Array([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16,
    ]);
    assert.deepEqual(Array.from(downsampleMag(source, 4, 4, 2, 2)), [6, 8, 14, 16]);
});

test('dct8 of a constant block has only a DC coefficient', () => {
    const result = dct8(new Float32Array(64).fill(10));
    assertClose(result[0], 80, 1e-4);
    result.slice(1).forEach(value => assertClose(value, 0, 1e-4));
});

test('haar2d2level returns expected dimensions for a constant image', () => {
    const result = haar2d2level(new Float32Array(64).fill(4), 8, 8);
    assert.equal(result.w1, 4);
    assert.equal(result.h1, 4);
    assert.equal(result.w2, 2);
    assert.equal(result.h2, 2);
    result.HH1.forEach(value => assert.equal(value, 0));
    result.HH2.forEach(value => assert.equal(value, 0));
});
