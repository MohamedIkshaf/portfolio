/**
 * Calculates estimated reading time in minutes for markdown text.
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute) || 1;
}

/**
 * Extracts table of contents headings from raw markdown.
 */
export function extractHeadings(markdown: string) {
  const headingLines = markdown.split("\n").filter((line) => line.startsWith("## "));

  return headingLines.map((line) => {
    const text = line.replace(/^##\s+/, "").trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return { text, id };
  });
}
