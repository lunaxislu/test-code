import type { Preview } from "@storybook/react-vite";
import { withRouter } from "storybook-addon-remix-react-router";
import "../src/index.css";
import { initialize, mswLoader } from "msw-storybook-addon";
import { handler } from "../src/mocks/handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            refetchInterval: false,
        },
    },
});
initialize();
const preview: Preview = {
    tags: ["autodocs"],

    parameters: {
        //We recommend removing the argTypesRegex and assigning explicit action with the fn function from storybook/test instead:
        //https://storybook.js.org/docs/essentials/actions#via-storybooktest-fn-spies
        // actions: { argTypesRegex: "^on.*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        // background 설정
        backgrounds: {
            options: {
                dark: { name: "Dark test", value: "#333" },
                light: { name: "Light test", value: "#fff" },
                // 👇 Add your own
                maroon: { name: "custom background", value: "#400" },
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo",
        },

        // Storybook addon 은 parameters.msw.handlers 키를 읽음
        //https://github.com/mswjs/msw-storybook-addon/blob/main/MIGRATION.md
        msw: {
            handlers: handler,
        },
    },
    // 초기 값 전역적으로 설정
    initialGlobals: {
        // 👇 Set the initial background color
        backgrounds: { value: "light" },
        viewport: { value: "mobile1", isRotated: false },
        outline: true,
    },

    decorators: [
        (Story) => {
            return (
                <QueryClientProvider client={queryClient}>
                    <Story />
                </QueryClientProvider>
            );
        },
        withRouter,
    ],
    loaders: [mswLoader],
};

export default preview;
