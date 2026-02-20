export function getSearchParamsAsString(
  param: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param;
}

export function getSearchParamsAsNumber(
  param: string | string[] | undefined,
): number | undefined {
  const searchParam = Array.isArray(param)
    ? parseInt(param[0], 10)
    : param
      ? parseInt(param)
      : undefined;

  return searchParam;
}
