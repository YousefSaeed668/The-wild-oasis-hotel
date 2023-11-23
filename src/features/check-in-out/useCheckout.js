import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      // This Is An Alternative to queryKey And It Invalidate All Active Queries In This Page
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There Was An Error While Checking out  "),
  });
  return { checkout, isCheckingOut };
}
