export const waitFor = async <T = object>(
  maxRetries: number,
  retryInterval: number,
  func: () => Promise<T | undefined>,
): Promise<T | undefined> => {
  for (let i = 0; i < maxRetries; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const result = await func();
    if (result) {
      return result;
    }
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => {
      setTimeout(resolve, retryInterval);
    });
  }
  return undefined;
};
