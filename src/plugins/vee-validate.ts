import { configure } from 'vee-validate'

export function setupVeeValidate() {
  configure({
    bails: false,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnInput: false,
    validateOnModelUpdate: true,
  })
}
