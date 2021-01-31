import { ref } from 'vue'

const SENSITIVITY = 300
const TUNE_SENSITIVITY = SENSITIVITY * 10

export function draggable(initValue: number) {
  const value = ref(initValue)
  const isDragging = ref(false)
  const prevCoords = { x: 0, y: 0 }

  function move(x: number, y: number, shift: boolean) {
    const sensitivity = shift ? TUNE_SENSITIVITY : SENSITIVITY
    const offset = x - prevCoords.x + prevCoords.y - y
    const newValue = value.value + offset / sensitivity
    prevCoords.x = x
    prevCoords.y = y

    value.value = Math.min(Math.max(newValue, 0), 1)
  }

  function mouseMove(e: MouseEvent) {
    move(e.pageX, e.pageY, e.shiftKey)
  }

  function touchMove(e: TouchEvent) {
    move(e.targetTouches[0].pageX, e.targetTouches[0].pageY, e.shiftKey)
  }

  function mouseUp() {
    window.removeEventListener('mousemove', mouseMove)
    window.removeEventListener('mouseup', mouseUp)
    isDragging.value = false
  }

  function touchEnd() {
    window.removeEventListener('touchmove', touchMove)
    window.removeEventListener('touchend', touchEnd)
    isDragging.value = false
  }

  function mouseDown(e: MouseEvent) {
    isDragging.value = true
    prevCoords.x = e.pageX
    prevCoords.y = e.pageY

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', mouseUp)
  }

  function touchStart(e: TouchEvent) {
    isDragging.value = true
    prevCoords.x = e.targetTouches[0].pageX
    prevCoords.y = e.targetTouches[0].pageY

    window.addEventListener('touchmove', touchMove)
    window.addEventListener('touchend', touchEnd)
  }

  return {
    value,
    isDragging,
    mouseDown,
    touchStart,
  }
}
