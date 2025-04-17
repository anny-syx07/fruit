/**
 * Custom error class that includes a code and optional location.
 * Used to provide more context to the client when an error occurs.
 *
 * @param message - The error message. This message will be displayed to the client.
 * @param code - The error code that the response will include. Default is 500.
 * @param location - The location of the error. This can be used to make debugging easier. Every location should be unique.
 */
class CodedError extends Error {
  code: number
  location?: string

  constructor(message: string, code: number = 500, location?: string) {
    super(message)
    this.code = code
    if (location) this.location = location
  }
}

export default CodedError
