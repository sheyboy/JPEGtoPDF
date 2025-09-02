import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument } from 'pdf-lib';

// Basic test ensures pdf-lib is functional
// by creating a simple one-page PDF and verifying output length

test('PDFDocument creates a non-empty PDF', async () => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.addPage([50, 50]);
  const pdfBytes = await pdfDoc.save();
  assert.ok(pdfBytes.length > 0);
});
