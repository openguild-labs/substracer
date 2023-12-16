export const generateTextStroke = (color: string | undefined, width: number | undefined) => {
  if (!color || !width) return 'unset';
  const r = width; /* width of outline in pixels */
  const n = Math.ceil(2 * Math.PI * r); /* number of shadows */
  var str = '';
  for (var i = 0; i < n; i++ /* append shadows in n evenly distributed directions */) {
    const theta = (2 * Math.PI * i) / n;
    str +=
      r * Math.cos(theta) +
      'px ' +
      r * Math.sin(theta) +
      'px 0 ' +
      color +
      (i === n - 1 ? '' : ',');
  }
  return str;
};
