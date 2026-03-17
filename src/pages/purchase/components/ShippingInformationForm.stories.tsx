import type { Meta, StoryObj } from "@storybook/react-vite";
import ShippingInformationForm from "./ShippingInformationForm";
import { FormProvider, useForm } from "react-hook-form";
import { within } from "storybook/test";
import type { PurchaseFormValues } from "@/shared/types/purchase";
import { NO_COUPON_ID } from "@/shared/types/coupon";

const meta = {
    title: "구매/배송 정보",
    component: ShippingInformationForm,

    decorators: [
        (Story) => {
            const forms = useForm<PurchaseFormValues>({
                defaultValues: {
                    name: "",
                    address: "",
                    phone: "",
                    requests: "",
                    coupon: NO_COUPON_ID,
                    payment: "creditCard",
                },
            });
            return (
                <FormProvider {...forms}>
                    <Story />
                </FormProvider>
            );
        },
    ],
} satisfies Meta<typeof ShippingInformationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
    name: "필드를 입력한 상태",
    play: async ({ canvas, userEvent }) => {
        const [nameInput, addressInput, phoneInput, requestInput] =
            canvas.getAllByRole("textbox");

        await userEvent.type(nameInput, "OBAO");
        await userEvent.type(addressInput, "Seoul, South Korea");
        await userEvent.type(phoneInput, "010-2222-3333");
        await userEvent.type(requestInput, "개조심!!");

        const couponSelect = await canvas.findByRole("combobox", {
            name: "쿠폰 리스트",
        });
        const options = await within(couponSelect).findAllByRole("option");
        // expect(options[1]).toBeInTheDocument();

        // 강의(커스텀 select click 가능) -> 내 프로젝트(native select): selectOptions가 더 정확함
        await userEvent.selectOptions(couponSelect, options[1]);
    },
};

export const ErrorFields: Story = {};
