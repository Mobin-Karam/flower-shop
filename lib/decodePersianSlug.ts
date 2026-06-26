export function decodePersianSlug(slug: string): string {
  const decoded = decodeURIComponent(slug);

  return decoded
    .replace(/_/g, " ") // underscores → space
    .replace(/\s+/g, " ") // collapse spaces
    .trim();
}
