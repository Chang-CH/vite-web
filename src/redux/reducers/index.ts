import { combineReducers } from '@reduxjs/toolkit/react';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  theme: themeReducer,
});

export default rootReducer;
