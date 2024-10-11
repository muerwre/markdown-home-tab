export const splitTextInChunks = (
  text: string,
  chunkSize: number,
  makeKey: (index: number) => string
) => {
  if (chunkSize <= 0 || !text.trim()) {
    return [];
  }

  const results: string[] = [""];

  for (let i = 0; i < text.length; i += 1) {
    const index = results.length - 1;
    const key = makeKey(index);
    const last = results[index];
    const length = new Blob([last + key + text[i]]).size;

    if (length > chunkSize) {
      results.push(text[i]);
    } else {
      results[index] = results[index] + text[i];
    }
  }

  return results;
};

export const joinTextFromChunks = (
  makeKey: (index: number) => string,
  values: Record<string, string>
) => {
  let result = values[makeKey(0)];

  if (result == undefined) {
    return;
  }

  let i = 1;

  while (values[makeKey(i)]) {
    result += values[makeKey(i)];
    i += 1;
  }

  return result;
};

export const makeChunks = (
  text: string,
  makeKey: (index: number) => string,
  chunkSize: number
): Record<string, string> => {
  const chunks = splitTextInChunks(text, chunkSize, makeKey);

  if (chunkSize <= 0) {
    return {};
  }

  return [...new Array(chunks.length)]
    .fill(null)
    .reduce((acc, _, i) => ({ ...acc, [makeKey(i)]: chunks[i] }), {});
};
