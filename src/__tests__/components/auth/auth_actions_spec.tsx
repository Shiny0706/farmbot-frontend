import { didLogin } from "../../../components/auth/auth_actions.tsx";
describe("auth actions", () => {
  it("has a function to bootstrap post login operations", () => {
      expect(didLogin).toBeDefined();
  });
});
