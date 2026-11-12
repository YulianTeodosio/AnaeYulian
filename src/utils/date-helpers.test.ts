import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRelationshipTime, formatEditorialDate, verifyAdminPassword } from './date-helpers';

test('calculateRelationshipTime calculates days and formatted date correctly', () => {
  const start = '2024-01-01';
  const mockCurrent = new Date('2024-01-11');
  const stats = calculateRelationshipTime(start, mockCurrent);

  assert.equal(stats.daysTogether, 10);
  assert.ok(stats.formattedAnniversary.includes('2024'));
});

test('calculateRelationshipTime handles invalid date gracefully', () => {
  const stats = calculateRelationshipTime('invalid-date');
  assert.equal(stats.daysTogether, 0);
  assert.equal(stats.formattedAnniversary, '');
});

test('formatEditorialDate formats valid date', () => {
  const formatted = formatEditorialDate('2024-05-18');
  assert.ok(formatted.includes('2024'));
  assert.ok(formatted.includes('18'));
});

test('verifyAdminPassword checks password case-insensitively', () => {
  assert.equal(verifyAdminPassword('anayulian'), true);
  assert.equal(verifyAdminPassword('ANAYULIAN'), true);
  assert.equal(verifyAdminPassword(' AnaYulian '), true);
  assert.equal(verifyAdminPassword('wrongpass'), false);
  assert.equal(verifyAdminPassword(''), false);
});
