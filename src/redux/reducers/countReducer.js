export const countReducer = (state = 0, action) => {
    switch(action.type) {
      case 'PLUS':
        return state + 1;
      case 'MINUS':
        return state - 1;
      default:
        return state;
    }
  };