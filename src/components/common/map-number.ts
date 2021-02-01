export function mapNormNumber(value: number, min: number, max: number) {
  return min + value * (max - min)
}

export function mapNumber(
  value: number,
  x1: number,
  x2: number,
  y1: number,
  y2: number,
) {
  return ((value - x1) * (y2 - y1)) / (x2 - x1) + y1
}
