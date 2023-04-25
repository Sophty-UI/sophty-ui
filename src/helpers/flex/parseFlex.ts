const parseFlex = (flex?: number | string): string | undefined => {
  if (typeof flex === 'number') return `${flex} ${flex} auto`;
  if (flex && /^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) return `0 0 ${flex}`;

  return flex;
};

export default parseFlex;
