function clipAvatarShape(ctx, x, y, r, n = 2.5, p = 360) {
  // x^n + y^n = r^n
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j <= p / 4; j++) {
      let dx = r * Math.cos(2 * Math.PI * (j / p)) ** (2 / n),
        dy = r * Math.sin(2 * Math.PI * (j / p)) ** (2 / n);
      if (i == 0) ctx.lineTo(x + dx, y + dy);
      else if (i == 1) ctx.lineTo(x - dx, y + dy);
      else if (i == 2) ctx.lineTo(x - dx, y - dy);
      else ctx.lineTo(x + dx, y - dy);
    }
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
