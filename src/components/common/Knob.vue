<template lang="pug">
// Based on https://www.jqueryscript.net/demo/Minimal-SVG-Based-Knob-Widget-For-jQuery-UI-Knob-js/
.knob(@mousedown="mouseDown" @touchstart.prevent="touchStart")
  svg(viewBox="0 0 2 2")
    circle.knob-stroke(
      :style="{ 'stroke-dasharray': strokeStyle }"
      cx="1"
      cy="1"
      r="1"
      clip-path="url(#knob-clip2)"
    )
    clipPath#knob-clip2
      circle(cx="1" cy="1" r="1")
  .knob-knob
    .knob-pointer-container(:style="{ transform: knobTransform }")
      span.knob-pointer
  span.knob-tooltip(v-show="isDragging") {{ tooltip }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { draggable } from '@/composition/draggable'
import { mapNormNumber } from '@/components/common/map-number'

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    tooltip: {
      type: String,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: number) => true,
  },

  setup(props) {
    return draggable(props.modelValue)
  },

  watch: {
    // Save v-model to internal value on external update
    modelValue(newValue: number) {
      this.value = newValue
    },

    // Update v-model
    value(newValue: number) {
      this.$emit('update:modelValue', newValue)
    },
  },

  computed: {
    knobTransform(): string {
      return `rotate(${mapNormNumber(this.value, -140, 140)}deg)`
    },

    strokeStyle(): string {
      const ang = mapNormNumber(this.value, 0, (Math.PI * 2 * 7) / 9)
      return `${ang}px, ${Math.PI * 2}px`
    },
  },
})
</script>

<style lang="scss" scoped>
.knob {
  display: inline-block;
  position: relative;
  width: 50px;
}

.knob-stroke {
  fill: #111111;
  stroke: var(--bs-warning);
  stroke-width: 10%;
  transform-origin: 50% 50% 0px;
  transform: rotate(-50deg) scale(-1);
}

.knob-knob {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  height: 80%;
  width: 80%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  overflow: hidden;

  transition: width 0.2s, height 0.2s;
  background-color: #111;
  border: 2px solid #222;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 1), 0px 10px 5px rgba(0, 0, 0, 0.3),
    inset 0px 10px 10px rgba(255, 255, 255, 0.05);

  &:before {
    position: absolute;
    left: 10%;
    top: 10%;
    width: 70%;
    height: 70%;
    content: ' ';
    background: linear-gradient(
      -25deg,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.2)
    );
    z-index: 3;
    filter: blur(1px);
    border-radius: 100%;
  }
}

.knob-pointer-container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  transform-origin: 50% 50% 0px;
  z-index: 1;
}

.knob-pointer {
  position: absolute;
  top: 7.5%;
  left: 50%;
  height: 15%;
  width: 10%;
  transform: translate(-50%);
  background-color: var(--bs-warning);
  border-radius: 2em;
  box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 1),
    0px 0px 0px 1px rgba(255, 255, 255, 0.1);
}

.knob-tooltip {
  position: absolute;
  z-index: 999;
  color: rgb(255, 255, 255);
  font-family: monospace;
  padding: 0.25em 0.5em;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.5);
  top: 50%;
  left: 50%;
}
</style>
