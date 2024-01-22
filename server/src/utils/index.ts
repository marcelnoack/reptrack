export const addTrailingSlash = (inputString: string): string => {
  if (typeof inputString !== 'string' || !inputString?.length) return '';

  return inputString.endsWith('/') ? inputString : inputString + '/';
};
