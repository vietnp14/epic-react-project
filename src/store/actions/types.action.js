const ACTION_PREFIXES = {
  // Prefix for User actions
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',

  // Prefix for Book actions
  GET_BOOK: 'GET_BOOK',
  GET_BOOKS: 'GET_BOOKS',
  UPDATE_BOOK: 'UPDATE_BOOK',

  // Prefix for List Item actions
  GET_LIST_ITEMS: 'GET_LIST_ITEMS',
};

const ACTION_TYPES = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

const AUTHENTICATION_ACTIONS = {
  // Login actions
  LOGIN_REQUEST: 'Login Request',
  LOGIN_SUCCESS: 'Login Success',
  LOGIN_FAILURE: 'Login Failure',

  // Register actions
  REGISTER_REQUEST: 'Login Request',
  REGISTER_SUCCESS: 'Login Success',
  REGISTER_FAILURE: 'Login Failure',

  // Log out actions
  LOGOUT_REQUEST: 'Login Request',
  LOGOUT_SUCCESS: 'Login Success',
  LOGOUT_FAILURE: 'Login Failure',
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