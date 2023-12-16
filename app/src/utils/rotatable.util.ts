export const getAngle = ({ x: x1, y: y1 }: any, { x: x2, y: y2 }: any) => {
  const dot = x1 * x2 + y1 * y2;
  const det = x1 * y2 - y1 * x2;
  const angle = (Math.atan2(det, dot) / Math.PI) * 180;
  return (angle + 360) % 360;
};
