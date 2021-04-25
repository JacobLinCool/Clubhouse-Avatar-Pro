function clipAvatarShape(ctx, x, y, r, n = 2.5, p = 360) {
  // x^n + y^n = r^n
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  for (let i = 1; i <= p; i++) {
    let dx = r * Math.abs(Math.cos(2 * Math.PI * (i / p))) ** (2 / n),
      dy = r * Math.abs(Math.sin(2 * Math.PI * (i / p))) ** (2 / n);
    if (i > p / 4 && i < (p * 3) / 4) dx = -dx;
    if (i > p / 2) dy = -dy;
    ctx.lineTo(x + dx, y + dy);
  }
  ctx.closePath();
  ctx.clip();
}

function drawClippedImage(ctx, img, x, y, r, n = 2.5, p = 360) {
  ctx.save();
  clipAvatarShape(ctx, x, y, r, n, p);
  ctx.drawImage(img, x - r, y - r, r * 2, r * 2);
  ctx.restore();
}

export default { clipAvatarShape, drawClippedImage };
