import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const rules = readFileSync('firestore.rules','utf8');

describe('Firestore privileged role boundary', () => {
  it('does not trust the client profile role for administrative authorization', () => {
    const start = rules.indexOf('function isAdmin()');
    const end = rules.indexOf('function hasOnlyAllowedFields(', start);
    const admin = rules.slice(start, end);
    expect(admin).toContain('adminRoles');
    expect(admin).toContain('request.auth.token.admin == true');
    expect(admin).not.toContain('documents/users/');
    expect(admin).not.toMatch(/get\(.*users/);
  });
  it('does not allow profile create/update to self-promote', () => {
    expect(rules).toContain("request.resource.data.role == 'artist'");
    expect(rules).toContain('request.resource.data.role == resource.data.role');
    expect(rules).toContain('allow write: if isAdmin();');
  });
});
