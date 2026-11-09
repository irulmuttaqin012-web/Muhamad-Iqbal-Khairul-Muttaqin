import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateStep1,
  validateStep2,
  validateStep3,
  getEmpathyQuote,
  generateTicketId,
  EMOTIONS,
  CATEGORIES,
} from './logic';

test('validateStep1 checks emotion presence', () => {
  assert.equal(validateStep1(null), false);
  assert.equal(validateStep1('overwhelmed'), true);
  assert.equal(validateStep1('stuck'), true);
  assert.equal(validateStep1('burnout'), true);
  assert.equal(validateStep1('neutral'), true);
});

test('validateStep2 checks that at least one category is selected', () => {
  assert.equal(validateStep2([]), false);
  assert.equal(validateStep2(['Tesis / Publikasi']), true);
  assert.equal(validateStep2(['Tesis / Publikasi', 'Manajemen Waktu (Kerja vs Kuliah)']), true);
});

test('validateStep3 verifies story text length threshold', () => {
  assert.equal(validateStep3(''), false);
  assert.equal(validateStep3('   '), false);
  assert.equal(validateStep3('Pendek'), false); // 6 chars < 10
  assert.equal(validateStep3('Saya sedang kesulitan tesis'), true); // > 10 chars
});

test('getEmpathyQuote returns meaningful reassuring messages', () => {
  assert.equal(getEmpathyQuote(null), '');
  const quote = getEmpathyQuote('overwhelmed');
  assert.ok(quote.length > 20);
  assert.ok(quote.includes('Tarik napas'));
});

test('generateTicketId produces consistent #MKSI format', () => {
  assert.equal(generateTicketId(1234), '#MKSI-1234');
  const dynamicId = generateTicketId();
  assert.ok(dynamicId.startsWith('#MKSI-'));
  assert.equal(dynamicId.length, 10); // '#MKSI-' (6) + 4 digits (4) = 10
});

test('EMOTIONS and CATEGORIES catalogue are populated', () => {
  assert.equal(EMOTIONS.length, 4);
  assert.equal(CATEGORIES.length, 5);
});
