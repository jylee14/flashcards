/**
 * custom hook to simplify the creation/usage of text state for forms
 */

import { ChangeEvent, useState } from 'react'


export function useInputField(initial: string | number | string[] | undefined, required = true) {
  const [value, setValue] = useState(initial)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
  const reset = () => setValue(initial)

  return {
    value,
    autoComplete: 'false',
    onChange,
    reset,
    required
  }
}