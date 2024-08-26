async function loadWordsFromFile(url: string = "src/assets/categories.txt") {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const text = await response.text();
    const words = text.split(/\s+/).filter(Boolean);

    return words;
  } catch (error) {
    console.error("Error loading words:", error);
    return [];
  }
}

let words: string[];
async function main() {
  words = await loadWordsFromFile();
}
main();

export function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}
