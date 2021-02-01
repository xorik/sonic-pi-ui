<template lang="pug">
h4.text-center Envelope

.row
  .col.text-center
    KnobControl(v-model="attack" title="Attack" :mode="mode")
  .col.text-center
    KnobControl(v-model="delay" title="Delay" :mode="mode")
  .col.text-center
    KnobControl(v-model="sustain" title="Sustain" :mode="mode")
  .col.text-center
    KnobControl(v-model="release" title="Release" :mode="mode")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KnobControl from '@/components/common/KnobControl.vue'
import { Mode } from '@/composition/knob-mode'

export default defineComponent({
  components: { KnobControl },
  data() {
    return {
      attack: 10,
      delay: 0,
      sustain: 0,
      release: 0,
      mode: Mode.Envelope,
    }
  },
})
</script>
