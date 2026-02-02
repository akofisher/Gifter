export const formatDeepLink = (path: string) => {
  const arr = path.split('/');
  if (arr.length < 2) {
    throw new Error(
      "The string must contain at least two elements separated by '/'",
    );
  }

  const result: {[key: string]: any} = {};
  const firstItem = arr[0];

  for (let i = 1; i < arr.length; i += 2) {
    const key = arr[i];
    const value = arr[i + 1];
    result[key] = value;
  }

  return {routeName: firstItem, params: result};
};

export const handleDeepLink = ({url}: {url: string}) => {
  const route = url?.replace(/.*?:\/\//g, '');
  const formattedDeeplink = formatDeepLink(route);
  return formattedDeeplink;
};
