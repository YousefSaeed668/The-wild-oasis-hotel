import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";

import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  // 1) Filter
  // const filterValue = searchParams.get("status") || "all";
  // let filteredCabins;
  // if (filterValue === "all") filteredCabins = bookings;
  // if (filterValue === "checked-out")
  //   filteredCabins = bookings.filter(
  //     (booking) => booking.status === "checked-out"
  //   );
  // if (filterValue === "checked-in")
  //   filteredCabins = bookings.filter(
  //     (booking) => booking.status === "checked-in"
  //   );
  // if (filterValue === "unconfirmed")
  //   filteredCabins = bookings.filter(
  //     (booking) => booking.status === "unconfirmed"
  //   );
  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName="bookings" />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
// in count prop i can just pass bookings length and it will work
// without any problem
export default BookingTable;
