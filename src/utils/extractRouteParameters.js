export function extractRouteParameters(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const matches = [];
  let match;
  while ((match = routeParametersRegex.exec(path)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}
