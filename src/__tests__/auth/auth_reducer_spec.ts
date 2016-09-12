import { authReducer } from "../../auth/auth_reducer";
import { fakeState } from "../helpers";
import { ReduxAction } from "../../interfaces";

describe("reducers", () => {
    it("should handle actions", () => {
        let state = fakeState().auth;
        let action: ReduxAction<any> = {
            type: "LOGIN_OK",
            payload: null
        };
        let nextState = authReducer(state, action);
        expect(nextState).toBeDefined();
    });
});
