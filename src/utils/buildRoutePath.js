export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  return path.replace(routeParametersRegex, '(?<$1>[a-z0-9-_]+)');
}
