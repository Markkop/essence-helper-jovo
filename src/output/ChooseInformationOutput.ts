import { BaseOutput, Output, OutputTemplate } from '@jovotech/framework'

@Output()
export class ChooseInformationOutput extends BaseOutput {
  build(): OutputTemplate | OutputTemplate[] {
    return {
      quickReplies: ['equipment perk', 'cooking ingredient'],
      listen: true,
    }
  }
}
