export function cleanPayload<T extends Record<string, unknown>>(payload: T): T {
  Object.keys(payload).forEach((key) => {
    if (
      payload[key] === null ||
      payload[key] === undefined ||
      payload[key] === ""
    ) {
      delete payload[key];
    }
  });
  return payload;
}
