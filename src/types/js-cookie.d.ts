declare module "js-cookie" {
  const Cookies: {
    get(name: string): string | undefined;
    remove(name: string, options?: { path?: string; domain?: string }): void;
  };

  export default Cookies;
}
