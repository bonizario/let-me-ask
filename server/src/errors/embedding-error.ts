export class EmbeddingError extends Error {
  constructor() {
    super()

    this.name = 'EmbeddingError'
    this.message = 'Failed to generate embeddings for the provided text'
  }
}
