const ACTION_PREFIXES = {
  // Prefix for User actions
  LOGIN: 'Login',
  REGISTER: 'Register',
  LOGOUT: 'Logout',
  RESET_AUTH_ERROR_MESSAGE: 'Reset Auth Error Message',

  // Prefix for Book actions
  GET_BOOK: 'Get Book',
  GET_BOOKS: 'Get Books',
  UPDATE_BOOK: 'Update Book',

  // Prefix for List Item actions
  GET_LIST_ITEMS: 'Get List Items',
};

const ACTION_TYPES = {
  REQUEST: 'Request',
  SUCCESS: 'Success',
  FAILURE: 'Failure',
};

const AUTHENTICATION_ACTIONS = {
  // Login actions
  LOGIN_REQUEST: 'Login Request',
  LOGIN_SUCCESS: 'Login Success',
  LOGIN_FAILURE: 'Login Failure',
  RESET_AUTH_ERROR_MESSAGE: 'Reset Auth Error Message',

  // Register actions
  REGISTER_REQUEST: 'Register Request',
  REGISTER_SUCCESS: 'Register Success',
  REGISTER_FAILURE: 'Register Failure',

  // Log out actions
  LOGOUT_REQUEST: 'Logout Request',
  LOGOUT_SUCCESS: 'Logout Success',
  LOGOUT_FAILURE: 'Logout Failure',
};

const BOOK_ACTIONS = {
  // Get a book
  GET_BOOK_REQUEST: 'Get Book Request',
  GET_BOOK_SUCCESS: 'Get Book Success',
  GET_BOOK_FAILURE: 'Get Book Failure',

  // Get books
  GET_BOOKS_REQUEST: 'Get Books Request',
  GET_BOOKS_SUCCESS: 'Get Books Success',
  GET_BOOKS_FAILURE: 'Get Books Failure',

  // Update a book
  UPDATE_BOOK_REQUEST: 'Update Book Request',
  UPDATE_BOOK_SUCCESS: 'Update Book Success',
  UPDATE_BOOK_FAILURE: 'Update Book Failure',
};

const LIST_ITEMS_ACTIONS = {
  // Get list items
  GET_LIST_ITEMS_REQUEST: 'Get List Items Request',
  GET_LIST_ITEMS_SUCCESS: 'Get List Items Success',
  GET_LIST_ITEMS_FAILURE: 'Get List Items Failure',
};

export {
  AUTHENTICATION_ACTIONS,
  LIST_ITEMS_ACTIONS,
  BOOK_ACTIONS,
  ACTION_TYPES,
  ACTION_PREFIXES,
};
