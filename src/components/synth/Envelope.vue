<template lang="pug">
h4.text-center Envelope

.row
  .col.text-center
    Knob(v-model="attack")
    p Attack
  .col.text-center
    Knob(v-model="delay")
    p Delay
  .col.text-center
    Knob(v-model="sustain")
    p Sustain
  .col.text-center
    Knob(v-model="release")
    p Release
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Knob from '@/components/common/Knob.vue'

export default defineComponent({
  components: { Knob },
  data() {
    return {
      attack: 0,
      delay: 0,
      sustain: 0,
      release: 0,
    }
  },
})
</script>
