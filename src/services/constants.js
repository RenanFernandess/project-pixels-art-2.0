export const BOARD = 'board';
export const BOARDSAVEDLIST = 'boardSavedList';
export const LIBRARY = 'library';
export const PIXELBOARD = 'pixelBoard';
export const TRASH = 'trash';

export const RGB_COLOR_REGEXP = /background-color: (\w+|rgb\((\d+[,] \d+[,] \d+)\));/gm

export const BUTTON_CLEAR = document.getElementById('clear-board');
export const BUTTON_SAVE = document.getElementById('save-board');
export const BUTTON_SAVE_AS = document.getElementById('save-board-as');
export const BUTTON_SET_BOARD = document.getElementById('generate-board');
export const BUTTON_COME_BACK = document.getElementById('come-back');
export const BUTTON_ADVANCE = document.getElementById('advance');
export const COLORS_DIV = document.getElementsByClassName('color');
export const INPUT_BOARD_NAME = document.getElementById('board-name');
export const INPUT_BOARD_SIZE = document.getElementById('board-size');
export const INPUT_COLOR = document.getElementById('new-color');
export const INPUT_COLOR_CONTAINER = document.getElementById('box-new-color');
export const NAV_OPITIONS = document.getElementById('nav-opitions');
export const PIXEL_BOARD = document.getElementById('pixel-board');
export const PALETTE_CONTAINER = document.getElementById('palette-container');
export const WARNING_MESSAGE_PARAGRAPH = document.getElementById('warning-message');