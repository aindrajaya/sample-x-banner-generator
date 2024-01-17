export const clearCanvasUtils = (canvasRef) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};