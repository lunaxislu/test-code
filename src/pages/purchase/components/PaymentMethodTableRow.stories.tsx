import type { Meta, StoryObj } from "@storybook/react-vite";
import PaymentMethodTableRow from "./PaymentMethodTableRow";
import { FormProvider, useForm } from "react-hook-form";
import { type PurchaseFormValues } from "@/shared/types/purchase";

const meta = {
    title: "구매/결제 정보",
    component: PaymentMethodTableRow,
    render: () => {
        const form = useForm<PurchaseFormValues>();
        return (
            <FormProvider {...form}>
                <PaymentMethodTableRow />
            </FormProvider>
        );
    },
} satisfies Meta<typeof PaymentMethodTableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "결제 정보",
};
