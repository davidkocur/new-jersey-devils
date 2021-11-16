export const SET_USER = "set-user";
export const initialState = {
  user: null,
};

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const userStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
