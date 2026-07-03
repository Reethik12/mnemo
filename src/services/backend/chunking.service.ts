export class ChunkingService {
  /**
   * Extremely simple recursive character text splitter.
   * Splits by paragraphs, then sentences, then words if necessary.
   */
  static splitText(
    text: string,
    maxChunkSize = 1000,
    _overlap = 200,
  ): string[] {
    if (text.length <= maxChunkSize) return [text];

    const chunks: string[] = [];
    const paragraphs = text.split(/\n\n+/);

    let currentChunk = "";

    for (const p of paragraphs) {
      if ((currentChunk + p).length <= maxChunkSize) {
        currentChunk += (currentChunk ? "\n\n" : "") + p;
      } else {
        if (currentChunk) {
          chunks.push(currentChunk);
        }

        // If a single paragraph is too large, split by sentences
        if (p.length > maxChunkSize) {
          const sentences = p.split(/(?<=\.|\?|\!)\s/);
          let sentenceChunk = "";
          for (const s of sentences) {
            if ((sentenceChunk + s).length <= maxChunkSize) {
              sentenceChunk += (sentenceChunk ? " " : "") + s;
            } else {
              if (sentenceChunk) chunks.push(sentenceChunk);
              sentenceChunk = s;
            }
          }
          if (sentenceChunk) {
            currentChunk = sentenceChunk;
          } else {
            currentChunk = "";
          }
        } else {
          currentChunk = p;
        }
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }
}
