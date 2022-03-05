import { BaseOutput, Output, OutputOptions, OutputTemplate } from '@jovotech/framework'

export interface CardOutputOptions extends OutputOptions {
  speakOutput: string
  cardTitle: string
}

@Output()
export class CardOutput extends BaseOutput<CardOutputOptions> {
  build(): OutputTemplate | OutputTemplate[] {
    return {
      message: this.options.speakOutput,
      card: {
        title: this.options.cardTitle,
        content: this.options.speakOutput,
      },
      listen: false,
    }
  }
}
