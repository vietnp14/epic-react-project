const ACTION_PREFIXES = {
  // Prefix for User's actions
  LOGIN: 'Login',
  REGISTER: 'Register',

  // Prefix for Book's actions
  GET_BOOK: 'Get Book',
  GET_BOOKS: 'Get Books',
  UPDATE_BOOK: 'Update Book',

  // Prefix for List Items's actions
  GET_LIST_ITEMS: 'Get List Items',

  // Prefix for List Item's actions
  ADD_LIST_ITEM: 'Add List Item',
  UPDATE_LIST_ITEM: 'Update List Item',
  REMOVE_LIST_ITEM: 'Remove List Item',
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

  // Register actions
  REGISTER_REQUEST: 'Register Request',
  REGISTER_SUCCESS: 'Register Success',
  REGISTER_FAILURE: 'Register Failure',

  // Log out actions
  LOGOUT: 'Logout',
};

const BOOK_ACTIONS = {
  // Get a book
  GET_BOOK_REQUEST: 'Get Book Request',
  GET_BOOK_SUCCESS: 'Get Book Success',
  GET_BOOK_FAILURE: 'Get Book Failure',

  // Set current book
  SET_CURRENT_BOOK: 'Set Current Book',

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

  // Add list item
  ADD_LIST_ITEM_REQUEST: 'Add List Item Request',
  ADD_LIST_ITEM_SUCCESS: 'Add List Item Success',
  ADD_LIST_ITEM_FAILURE: 'Add List Item Failure',

  // Update list item
  UPDATE_LIST_ITEM_REQUEST: 'Update List Item Request',
  UPDATE_LIST_ITEM_SUCCESS: 'Update List Item Success',
  UPDATE_LIST_ITEM_FAILURE: 'Update List Item Failure',

  // Remove list item
  REMOVE_LIST_ITEM_REQUEST: 'Remove List Item Request',
  REMOVE_LIST_ITEM_SUCCESS: 'Remove List Item Success',
  REMOVE_LIST_ITEM_FAILURE: 'Remove List Item Failure',
};

export {
  AUTHENTICATION_ACTIONS,
  LIST_ITEMS_ACTIONS,
  BOOK_ACTIONS,
  ACTION_TYPES,
  ACTION_PREFIXES,
};
