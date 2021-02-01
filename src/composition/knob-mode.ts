import { computed, ref } from 'vue'
import { mapNumber } from '@/components/common/map-number'

export const enum Mode {
  Envelope = 'ENV',
}

function knobEnvelop(initValue: number) {
  const toKnob = (value: number) =>
    value > 1 ? mapNumber(value, 1, 30, 0.5, 1) : value / 2

  // TODO: add watch
  const knobValue = ref(toKnob(initValue))

  const value = computed((): number =>
    knobValue.value > 0.5
      ? mapNumber(knobValue.value, 0.5, 1, 1, 30)
      : knobValue.value * 2,
  )

  const text = computed((): string =>
    value.value >= 1
      ? value.value.toFixed(1) + 's'
      : (value.value * 1000).toFixed() + 'ms',
  )

  return {
    knobValue,
    text,
    value,
  }
}

export function knobMode(mode: Mode, initValue: number) {
  if (mode === Mode.Envelope) {
    return knobEnvelop(initValue)
  }

  throw new Error('Unknown mode')
}
