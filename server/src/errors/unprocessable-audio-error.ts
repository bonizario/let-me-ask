export class UnprocessableAudioError extends Error {
  constructor() {
    super()

    this.name = 'UnprocessableAudioError'
    this.message = 'Error processing the audio file'
  }
}
