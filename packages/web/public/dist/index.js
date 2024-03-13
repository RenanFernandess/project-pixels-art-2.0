/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _components_ColorPalette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ColorPalette */ \"./src/components/ColorPalette/index.ts\");\n/* harmony import */ var _server_createHTML__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server/createHTML */ \"./src/server/createHTML/index.ts\");\n\n\nfunction App() {\n    return _server_createHTML__WEBPACK_IMPORTED_MODULE_1__.createHTML.section({ child: (0,_components_ColorPalette__WEBPACK_IMPORTED_MODULE_0__[\"default\"])() });\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App());\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/App.ts?");

/***/ }),

/***/ "./src/components/ColorPalette/index.ts":
/*!**********************************************!*\
  !*** ./src/components/ColorPalette/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ColorPalette)\n/* harmony export */ });\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../server */ \"./src/server/index.ts\");\n/* harmony import */ var _Pixel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pixel */ \"./src/components/Pixel/index.ts\");\n\n\nfunction ColorPalette() {\n    return _server__WEBPACK_IMPORTED_MODULE_0__.createHTML.div({\n        child: [(0,_Pixel__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(), (0,_Pixel__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(), (0,_Pixel__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(), (0,_Pixel__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(), (0,_Pixel__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(), (0,_Pixel__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(), (0,_Pixel__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()],\n        className: 'color-palette'\n    });\n}\n;\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/components/ColorPalette/index.ts?");

/***/ }),

/***/ "./src/components/Pixel/index.ts":
/*!***************************************!*\
  !*** ./src/components/Pixel/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Pixel)\n/* harmony export */ });\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../server */ \"./src/server/index.ts\");\n\nfunction Pixel() {\n    var style = { width: '20px', height: '20px', backgroundColor: 'black' };\n    return _server__WEBPACK_IMPORTED_MODULE_0__.createHTML.div({ style: style, className: 'pixel' });\n}\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/components/Pixel/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server */ \"./src/server/index.ts\");\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ \"./src/App.ts\");\n\n\n_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].render(_App__WEBPACK_IMPORTED_MODULE_1__[\"default\"], document.getElementById(\"root\"));\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/index.ts?");

/***/ }),

/***/ "./src/server/DOM/index.ts":
/*!*********************************!*\
  !*** ./src/server/DOM/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DOM: () => (/* binding */ DOM)\n/* harmony export */ });\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/server/DOM/render.ts\");\n\nvar DOM = {\n    render: _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n};\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/server/DOM/index.ts?");

/***/ }),

/***/ "./src/server/DOM/render.ts":
/*!**********************************!*\
  !*** ./src/server/DOM/render.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ render)\n/* harmony export */ });\nfunction render(node, container) {\n    container.appendChild(node);\n}\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/server/DOM/render.ts?");

/***/ }),

/***/ "./src/server/createHTML/div.ts":
/*!**************************************!*\
  !*** ./src/server/createHTML/div.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ div)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/server/createHTML/utils/index.ts\");\n\nfunction div(_a) {\n    var className = _a.className, child = _a.child, style = _a.style;\n    var div = document.createElement(\"div\");\n    className && div.classList.add(className);\n    style && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.addStyle)(div, style);\n    if (Array.isArray(child))\n        child.forEach(function (el) { return div.appendChild(el); });\n    else\n        div.append(child || '');\n    return div;\n}\n;\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/server/createHTML/div.ts?");

/***/ }),

/***/ "./src/server/createHTML/index.ts":
/*!****************************************!*\
  !*** ./src/server/createHTML/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createHTML: () => (/* binding */ createHTML)\n/* harmony export */ });\n/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./section */ \"./src/server/createHTML/section.ts\");\n/* harmony import */ var _div__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./div */ \"./src/server/createHTML/div.ts\");\n\n\nvar createHTML = {\n    section: _section__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    div: _div__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n};\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/server/createHTML/index.ts?");

/***/ }),

/***/ "./src/server/createHTML/section.ts":
/*!******************************************!*\
  !*** ./src/server/createHTML/section.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ section)\n/* harmony export */ });\nfunction section(_a) {\n    var child = _a.child, className = _a.className;\n    var section = document.createElement(\"section\");\n    className && section.classList.add(className);\n    section.append(child);\n    return section;\n}\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/server/createHTML/section.ts?");

/***/ }),

/***/ "./src/server/createHTML/utils/addStyle.ts":
/*!*************************************************!*\
  !*** ./src/server/createHTML/utils/addStyle.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ addStyle)\n/* harmony export */ });\nfunction addStyle(node, style) {\n    var backgroundColor = style.backgroundColor, width = style.width, height = style.height;\n    node.style.backgroundColor = backgroundColor;\n    node.style.width = width;\n    node.style.height = height;\n}\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/server/createHTML/utils/addStyle.ts?");

/***/ }),

/***/ "./src/server/createHTML/utils/index.ts":
/*!**********************************************!*\
  !*** ./src/server/createHTML/utils/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addStyle: () => (/* reexport safe */ _addStyle__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _addStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addStyle */ \"./src/server/createHTML/utils/addStyle.ts\");\n\n\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/server/createHTML/utils/index.ts?");

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createHTML: () => (/* reexport safe */ _createHTML__WEBPACK_IMPORTED_MODULE_1__.createHTML),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ \"./src/server/DOM/index.ts\");\n/* harmony import */ var _createHTML__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createHTML */ \"./src/server/createHTML/index.ts\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_DOM__WEBPACK_IMPORTED_MODULE_0__.DOM);\n\n\n\n//# sourceURL=webpack://@pixels-art/web/./src/server/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;