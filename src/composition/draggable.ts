import { ref } from 'vue'

const SENSITIVITY = 300
const TUNE_SENSITIVITY = SENSITIVITY * 10

export function draggable(initValue: number) {
  const value = ref(initValue)
  const isDragging = ref(false)
  const prevCoords = { x: 0, y: 0 }

  function mouseMove(e: MouseEvent) {
    const sensitivity = e.shiftKey ? TUNE_SENSITIVITY : SENSITIVITY
    const offset = e.pageX - prevCoords.x + prevCoords.y - e.pageY
    const newValue = value.value + offset / sensitivity
    prevCoords.x = e.pageX
    prevCoords.y = e.pageY

    value.value = Math.min(Math.max(newValue, 0), 1)
  }

  function mouseUp() {
    window.removeEventListener('mousemove', mouseMove)
    window.removeEventListener('mouseup', mouseUp)
    isDragging.value = false
  }

  function mouseDown(e: MouseEvent) {
    isDragging.value = true
    prevCoords.x = e.pageX
    prevCoords.y = e.pageY

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', mouseUp)
  }

  return {
    value,
    isDragging,
    mouseDown,
  }
}
