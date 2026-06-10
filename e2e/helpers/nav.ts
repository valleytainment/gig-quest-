/** Resolve app paths relative to Playwright baseURL (root or GitHub Pages subpath). */
export function appPath(path = ''): string {
  const normalized = path.replace(/^\/+/, '');
  return normalized ? `./${normalized}` : '.';
}
