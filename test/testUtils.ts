import { OutputTemplate } from '@jovotech/framework'
import { TextMessage } from '@jovotech/output'

export function expectOutputToEqual(output: OutputTemplate[], expectedOutput: OutputTemplate) {
  expect(output[0]).toBeTruthy()

  const outputMessage = output[0].message as TextMessage

  if (outputMessage?.text) {
    expect(output).toEqual([expectedOutput])
    return
  }

  const expectedOutputMessage = expectedOutput.message as TextMessage
  const alexaExpectedOutput = {
    ...output[0],
    message: expectedOutputMessage.text,
  }
  expect(output).toEqual([alexaExpectedOutput])
}
