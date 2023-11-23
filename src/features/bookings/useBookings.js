import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER

  const filterValue = searchParams.get("status");

  // if i want multiple Filter Just Pass An array Of Objects And Loop Them in getBookings function
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };
  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    // Empty Object Is Because Data Property At First Is Not Defiend Yet
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    // here queryKey work as dependency array so that every time "filter" changes it will do refetch again
    queryKey: ["bookings", filter, sortBy, page],
  });

  //PRE-FERTCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      // here queryKey work as dependency array so that every time "filter" changes it will do refetch again
      queryKey: ["bookings", filter, sortBy, page + 1],
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      // here queryKey work as dependency array so that every time "filter" changes it will do refetch again
      queryKey: ["bookings", filter, sortBy, page - 1],
    });
  return {
    isLoading,
    bookings,
    error,
    count,
  };
}
