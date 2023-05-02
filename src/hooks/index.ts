// viewed
import React from "react";
import { useRouter } from 'next/router'
// A custom hook that builds on useLocation to parse
// the query string for you.
export default function useQuery() {
  const {query} = useRouter()
  
  // const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(query.toString()), [query]);
}
