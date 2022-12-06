"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Menu_1 = __importDefault(require("@mui/material/Menu"));
const Fade_1 = __importDefault(require("@mui/material/Fade"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const MoreHoriz_1 = __importDefault(require("@mui/icons-material/MoreHoriz"));
const MoreVert_1 = __importDefault(require("@mui/icons-material/MoreVert"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Styles_1 = require("./Styles");
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const Dropdown = ({ options, toggleDirection = 'horizontal' }) => {
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const open = Boolean(anchorEl);
    const handleToggleClick = (event) => {
        if (!options)
            return;
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCustomItemClick = (item) => () => {
        item.onClick();
        handleClose();
    };
    const renderOptions = (0, react_1.useMemo)(() => {
        if (Array.isArray(options)) {
            return (react_1.default.createElement(Box_1.default, { display: "flex", flexDirection: "column", sx: { p: 0, m: 0 } }, options.map((item) => {
                const { key, icon, iconPosition = 'left', text } = item;
                const isLeftSide = iconPosition === 'left';
                return (react_1.default.createElement(MenuItem_1.default, { key: key, onClick: handleCustomItemClick(item) },
                    react_1.default.createElement(Box_1.default, { display: "flex", flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse' },
                        icon && (react_1.default.createElement(Styles_1.IconContainer, { isLeftSide: isLeftSide }, icon)),
                        text)));
            })));
        }
        return;
    }, [options]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Tooltip_1.default, { title: "Options" },
            react_1.default.createElement(IconButton_1.default, { id: "fade-button", "aria-controls": open ? 'fade-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleToggleClick }, toggleDirection === 'horizontal' ? (react_1.default.createElement(MoreHoriz_1.default, null)) : (react_1.default.createElement(MoreVert_1.default, null)))),
        react_1.default.createElement(Menu_1.default, { id: "fade-menu", MenuListProps: {
                'aria-labelledby': 'fade-button',
            }, anchorEl: anchorEl, open: open, onClose: handleClose, TransitionComponent: Fade_1.default }, renderOptions)));
};
exports.default = Dropdown;
//# sourceMappingURL=Dropdown.js.map