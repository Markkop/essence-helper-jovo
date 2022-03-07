import { BaseOutput, Output, OutputTemplate } from '@jovotech/framework'
import { Strings } from '../utilities/strings'

@Output()
export class FallbackWithHelpOutput extends BaseOutput {
  build(): OutputTemplate | OutputTemplate[] {
    return {
      message: this.$t(Strings.FALLBACK_WITH_HELP),
      listen: true,
    }
  }
}
