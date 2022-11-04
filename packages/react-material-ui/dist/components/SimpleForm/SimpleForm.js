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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const __1 = require("../../");
const core_1 = require("@rjsf/core");
const v5_1 = require("@rjsf/material-ui/v5");
const CustomWidgets_1 = require("../../styles/CustomWidgets");
const SimpleForm = (props) => {
    const { form, initialData, onSubmit, validate, onError } = props;
    const { fields } = form;
    const Form = (0, core_1.withTheme)(v5_1.Theme);
    const widgets = () => {
        return {
            TextWidget: CustomWidgets_1.CustomTextFieldWidget,
            CheckboxWidget: CustomWidgets_1.CustomCheckboxWidget,
            CheckboxesWidget: CustomWidgets_1.CustomCheckboxesWidget,
            RadioWidget: CustomWidgets_1.CustomRadioWidget,
            SelectWidget: CustomWidgets_1.CustomSelectWidget,
            switchWidget: CustomWidgets_1.CustomSwitchWidget,
        };
    };
    const generateRequired = (_fields) => {
        const required = [];
        Object.keys(_fields).map((key) => {
            if (_fields[key].required) {
                required.push(key);
            }
        });
        return required;
    };
    const generateProperties = (_fields) => {
        const properties = {};
        const fieldTypes = {
            string: 'string',
            email: 'string',
            password: 'string',
            array: 'array',
            stringArray: 'array',
            select: 'string',
            radio: 'string',
            checkbox: 'boolean',
            checkboxes: 'array',
            switch: 'boolean',
        };
        Object.keys(_fields).map((key) => {
            var _a;
            const field = _fields[key];
            const fieldType = fieldTypes[field.type];
            const fieldProperties = {};
            if (fieldType) {
                fieldProperties['type'] = fieldType;
            }
            if (field.title) {
                fieldProperties['title'] = field.title;
            }
            if (field.description) {
                fieldProperties['description'] = field.description;
            }
            if (field.options && field.type === 'checkboxes') {
                fieldProperties['items'] = {
                    type: 'string',
                    enum: field.options,
                };
                fieldProperties['uniqueItems'] = true;
            }
            if (['select', 'radio'].includes(field.type)) {
                (_a = field === null || field === void 0 ? void 0 : field.options) === null || _a === void 0 ? void 0 : _a.map((opt, i) => {
                    if (typeof opt === 'string') {
                        if (!fieldProperties.enum) {
                            fieldProperties.enum = [];
                        }
                        fieldProperties.enum[i] = opt;
                    }
                    if (typeof opt === 'object' && opt.value) {
                        if (!fieldProperties.enum) {
                            fieldProperties.enum = [];
                        }
                        if (!fieldProperties.enumNames) {
                            fieldProperties.enumNames = [];
                        }
                        fieldProperties['enum'][i] = opt.value;
                        fieldProperties['enumNames'][i] = opt.label;
                    }
                });
            }
            if (field.type === 'stringArray') {
                fieldProperties['items'] = {
                    type: 'string',
                    title: field.title,
                };
            }
            if (field.type === 'array' && field.fields) {
                fieldProperties['items'] = {
                    type: 'object',
                    required: generateRequired(field.fields),
                    properties: generateProperties(field.fields),
                };
            }
            properties[key] = fieldProperties;
        });
        return properties;
    };
    const schema = {
        type: 'object',
        required: generateRequired(fields),
        properties: generateProperties(fields),
    };
    const generateUiSchema = () => {
        const uiSchema = {};
        const widgetTypes = {
            email: 'email',
            password: 'password',
            select: 'select',
            radio: 'radio',
            checkbox: 'checkbox',
            checkboxes: 'checkboxes',
            switch: 'switchWidget',
        };
        Object.keys(fields).map((key) => {
            const field = fields[key];
            if (widgetTypes[field.type]) {
                uiSchema[key] = { 'ui:widget': widgetTypes[field.type] };
            }
        });
        return uiSchema;
    };
    const generateFormData = () => {
        const formData = Object.assign({}, initialData);
        Object.keys(fields).map((key) => {
            const field = fields[key];
            if (['stringArray', 'array'].includes(field.type)) {
                formData[key] = (initialData === null || initialData === void 0 ? void 0 : initialData[key]) || [''];
            }
        });
        if (Object.keys(formData).length) {
            return formData;
        }
        return null;
    };
    return (react_1.default.createElement(react_1.Fragment, null,
        form.title && (react_1.default.createElement(__1.Text, { variant: "h4", fontFamily: "Inter", fontSize: 24, fontWeight: 800, mt: 4, gutterBottom: true }, form.title)),
        react_1.default.createElement(__1.Box, null,
            react_1.default.createElement(Form, { schema: schema, uiSchema: generateUiSchema(), widgets: widgets(), formData: generateFormData(), noHtml5Validate: true, showErrorList: false, onSubmit: onSubmit, ArrayFieldTemplate: CustomWidgets_1.ArrayFieldTemplate, validate: validate, onError: onError },
                react_1.default.createElement(__1.Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3 } }, form.submitButtonLabel || 'Submit')))));
};
exports.default = SimpleForm;
//# sourceMappingURL=SimpleForm.js.map