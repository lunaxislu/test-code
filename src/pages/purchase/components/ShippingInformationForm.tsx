import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";

import AddressTableRow from "@/pages/purchase/components/AddressTableRow";
import CouponListTableRow from "@/pages/purchase/components/CouponListTableRow";
import NameTableRow from "@/pages/purchase/components/NameTableRow";
import PhoneTableRow from "@/pages/purchase/components/PhoneTableRow";
import RequestsTableRow from "@/pages/purchase/components/RequestsTableRow";

const ShippingInformationForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">배송 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <NameTableRow />
            <AddressTableRow />
            <CouponListTableRow />
            <PhoneTableRow />
            <RequestsTableRow />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShippingInformationForm;
