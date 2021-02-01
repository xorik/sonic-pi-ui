<template lang="pug">
Knob(v-model="knobValue" :tooltip="text")
p {{ title }}
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { knobMode, Mode } from '@/composition/knob-mode'
import Knob from '@/components/common/Knob.vue'

export default defineComponent({
  components: { Knob },

  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    mode: {
      type: String as PropType<Mode>,
      required: true,
      validator: (mode: Mode) => [Mode.Envelope].includes(mode),
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: number) => true,
  },

  setup(props) {
    return knobMode(Mode.Envelope, props.modelValue)
  },

  watch: {
    value(newValue: number) {
      this.$emit('update:modelValue', newValue)
    },
  },
})
</script>
