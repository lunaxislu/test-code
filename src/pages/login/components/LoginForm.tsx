import { Link } from "react-router-dom";
import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { LoginFormValues } from "@/pages/login/hooks/useLogin";

type LoginFormProps = {
  form: UseFormReturn<LoginFormValues>;
  isSubmitting: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const LoginForm = ({ form, isSubmitting, onSubmit }: LoginFormProps) => {
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="이메일을 입력하세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="비밀번호를 입력하세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "로그인 중..." : "로그인"}
        </Button>

        <div className="text-muted-foreground text-right text-sm">
          <Link to="#" onClick={(event) => event.preventDefault()}>
            회원가입
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
