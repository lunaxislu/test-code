import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AvailableUser } from "@/shared/types/user";

type UserListAccordionProps = {
  users: AvailableUser[];
  isLoading: boolean;
  isError: boolean;
};

const UserListAccordion = ({ users, isLoading, isError }: UserListAccordionProps) => {
  return (
    <Accordion type="single" collapsible defaultValue="available-users">
      <AccordionItem value="available-users">
        <AccordionTrigger>사용 가능한 유저 리스트</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>비밀번호</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3}>불러오는 중...</TableCell>
                </TableRow>
              ) : null}
              {isError ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    유저 목록을 불러오지 못했습니다.
                  </TableCell>
                </TableRow>
              ) : null}
              {!isLoading && !isError
                ? users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.password}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UserListAccordion;
