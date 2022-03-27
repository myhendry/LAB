import useSWRInfinite from "swr/infinite";

/*
If possible please make a video on authentication using swr and axios header with jwt token.
In swr documentation they showed invalidate previous user cached login data. It's little bit complicated.
1
Backbench Coder
Backbench Coder
3 months ago
noted!

1
DEWITT SCOTT CHAVEZ PONCE
DEWITT SCOTT CHAVEZ PONCE
1 month ago
you can use a fetcher function like this  
const fetcher = (furl: string) =>
    axios
      .get(furl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${accessToken}`
        }
      })
      .then((res) => {
        return res.data;
 });
*/
export const usePagination = <T>(url: string, searchText: string = "") => {
  const PAGE_SIZE = 2;

  const getKey = (pageIndex: number, previousPageData: T[]) => {
    pageIndex = pageIndex + 1;

    if (previousPageData && !previousPageData.length) return null; // reached the end

    return `${url}?page=${pageIndex}&limit=${PAGE_SIZE}&searchText=${searchText}`;
  };

  const {
    data,
    size: page,
    setSize: setPage,
    error,
    isValidating,
    mutate,
  } = useSWRInfinite(getKey);

  const paginatedData: T[] = [].concat.apply([], data!);

  const isLoadingMore = data && typeof data[page - 1] === "undefined";

  const isReachedEnd = data && data[data.length - 1]?.length < PAGE_SIZE;

  return {
    paginatedData,
    isLoadingMore,
    isReachedEnd,
    page,
    setPage,
    isValidating,
    error,
    mutate,
  };
};
