export function generateContentKey(collectionName: string, slug: string) {
  return `${collectionName}/${slug}`;
}

export function parseContentKey(contentKey: string) {
  const index = contentKey.indexOf('/');
  return { collection: contentKey.slice(0, index), slug: contentKey.slice(index + 1) };
}
