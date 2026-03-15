import type { Meta, StoryObj } from "@storybook/react-vite";
import LoginForm from "./LoginForm";
import { useForm } from "react-hook-form";

import { fn } from "storybook/test";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginFormStoryProps = {
    isSubmitting: boolean;
    onSubmit: (values: LoginFormValues) => void;
};
const loginFormSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "이메일을 입력해주세요.")
        .email("이메일 형식이 올바르지 않습니다."),
    password: z.string().trim().min(1, "비밀번호를 입력해주세요."),
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginFormStory = ({ isSubmitting, onSubmit }: LoginFormStoryProps) => {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    return (
        <LoginForm
            form={form}
            isSubmitting={isSubmitting}
            onSubmit={form.handleSubmit(onSubmit)}
        />
    );
};

const meta = {
    title: "로그인/폼",
    component: LoginFormStory,
    args: {
        isSubmitting: false,
        onSubmit: fn(),
    },
    render: LoginFormStory,
} satisfies Meta<typeof LoginFormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Submitting: Story = {
    name: "폼 전송 중",
    args: {
        isSubmitting: true,
    },
};

export const EmptySubmit: Story = {
    name: "빈 폼 제출",
    play: async ({ userEvent, canvas }) => {
        const submitButton = canvas.getByRole("button", { name: "로그인" });
        await userEvent.click(submitButton);
    },
};
export const InvalidInputField: Story = {
    name: "input field invalid",
    play: async ({ userEvent, canvas }) => {
        await userEvent.type(
            canvas.getByPlaceholderText("이메일을 입력하세요."),
            "asdf123456",
        );
        await userEvent.type(
            canvas.getByPlaceholderText("비밀번호를 입력하세요."),
            "123",
        );
        await userEvent.click(
            canvas.getByRole("button", {
                name: "로그인",
            }),
        );
    },
};
