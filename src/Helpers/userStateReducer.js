export const AUTH_START = "auth-start";
export const AUTH_FINISH = "auth-finish";

export const initialState = {
  user: null,
  isAuthPending: true,
};

export const authStart = () => ({
  type: AUTH_START,
});
export const authFinish = (user) => ({
  type: AUTH_FINISH,
  user,
});

export const userStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        user: null,
        isAuthPending: true,
      };
    case AUTH_FINISH:
      return {
        ...state,
        user: action.user,
        isAuthPending: false,
      };
    default:
      return state;
  }
};
