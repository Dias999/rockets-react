"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useTheme_1 = __importDefault(require("@mui/material/styles/useTheme"));
const useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
const DialogContent_1 = __importDefault(require("@mui/material/DialogContent"));
const DialogActions_1 = __importDefault(require("@mui/material/DialogActions"));
const Styles_1 = require("./Styles");
const Dialog = (props) => {
    const { open, handleClose, title, children, footer, dividers = false, } = props;
    const theme = (0, useTheme_1.default)();
    const fullScreen = (0, useMediaQuery_1.default)(theme.breakpoints.down('sm'));
    return (react_1.default.createElement(Styles_1.CustomDialog, { onClose: handleClose, open: open, fullScreen: fullScreen },
        title && (react_1.default.createElement(Styles_1.CustomDialogTitle, { onClose: handleClose }, title)),
        children && (react_1.default.createElement(DialogContent_1.default, { dividers: dividers }, children)),
        footer && react_1.default.createElement(DialogActions_1.default, null, footer)));
};
exports.default = Dialog;
//# sourceMappingURL=Dialog.js.map