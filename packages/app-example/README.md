## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Theming](#theming)
  - [Dark mode](#dark-mode)
  - [Custom values](#custom-values)
  - [Default theme](#default-theme)
  - [Components](#components)
- [Tables](#tables)
- [Forms](#forms)

## Introduction

Creating simple projects like MVPs is repetitive, boring and slow.

Rockets was born to make it super fast, with the least amount of code.

How does it work? Import the prebuilt components and the JSON based forms system as you need.

## Installation

Rockets is highly based on [Material UI](https://mui.com/) and requires react >= 17.0.0 and react-dom >= 17.0.0.

## Theming

Rockets will automatically provide a theme for you.

If you need control over the dark/light theme and/or the colors of the themes, you can wrap your app into a Theme Provider.

> Note: Theme Providers can be nested.

### Dark mode

If all you need is to change to dark mode or to toggle between light and dark, you just have to add `mode: 'dark'` to the `createTheme` helper, inside the palette object. Material UI's styling system will automatically modify several palette values to fit the dark mode.

```typescript
import ThemeProvider from 'app/Components/ThemeProvider'
import createTheme from 'app/styles/createTheme'

const darkMode = createTheme({
  palette: {
    mode: 'dark',
  },
})

<ThemeProvider theme={darkMode}>
  // Your app goes here
</ThemeProvider>
```

### Custom values

If you want to customize the theme colors, or if you want to add new variables to the theme, you can use the same `createTheme` to define the options for your theme.

```typescript
export const customTheme = createTheme({
  // Object inside the default theme
  palette: {
    primary: {
      main: '#2563EB',
      dark: '#1D4ED8',
    },
    background: {
      default: '#f9fafb',
    },
    text: {
      primary: '#374151',
      secondary: '#9CA3AF',
    },
  },
  // New object for the theme
  system: {
    main: '#2563eb'
    secondary: '#1d4ed8'
    danger: '#a51010'
  },
})
```

Because we are using TypeScript, we also need to override the Theme types so typescript can accept the new theme's values.

We need to create a new module file (e.g. "themeModule.d.ts").

```typescript
import {
  Theme as MUITheme,
  ThemeOptions as MUIThemeOptions,
} from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme extends MUITheme {
    system: {
      main: string
      secondary: string
      danger: string
    }
  }

  // allow configuration using `createTheme`
  interface ThemeOptions extends MUIThemeOptions {
    system?: {
      main?: string
      secondary?: string
      danger?: string
    }
  }
  export function createTheme(options?: ThemeOptions): Theme
}
```

### Default theme

The default theme has many important variables that can be overridden, including breakpoints, spacing, shadows, typography, etc...

You can see more about the default theme values at [Material UI's website](https://mui.com/material-ui/customization/default-theme/).

### Components

Most Rockets components, just as [Material UI](https://mui.com/pt/system/getting-started/the-sx-prop/), accepts the `sx` prop syntax. It's a shortcut for defining custom styles and relies on Material UI's styling engine. It works similar to [Styled Components](https://styled-components.com/).

Some examples:

```typescript
<Box
  sx={{
    bgcolor: 'background.paper',
    boxShadow: 1,
    borderRadius: 2,
    p: 2,
    minWidth: 300,
  }}
>
```

SX access to the theme variables, so you can access values from colors, spacing, shadows, etc...
In the example above, the `bgcolor` is referring to the theme's `background.paper` value. The same works for the `color` property.

> Note: SX has more shortcuts than CSS, so you can use `p` for `padding`, for example.

Margin and padding can receive a number. This number will be multiplied by the `theme.spacing` value (the default is 8px)

```typescript
<Box sx={{ margin: 2 }} />
// equivalent to (theme.spacing * 2)
```

Margin and padding have several aliases that can be used to speed things up:

```
m 	margin
mt 	margin-top
mr 	margin-right
mb 	margin-bottom
ml 	margin-left
mx 	margin-left, margin-right
my 	margin-top, margin-bottom
p 	padding
pt 	padding-top
pr 	padding-right
pb 	padding-bottom
pl 	padding-left
px 	padding-left, padding-right
py 	padding-top, padding-bottom
```

## Tables

Rockets provides a very simple way to use tables. All you have to do is to provide it an array of objects for the headers and another for the rows.

Each object of the header array will generate a table column. Each object of the rows array will generate a table row.

It's mandatory that every object of the row array has an "id" prop. After that, you can provide any key to the object to be matched to the header columns.

```typescript
const headers: HeadersProps[] = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'status',
    label: 'Status',
  },
  {
    id: 'role',
    label: 'Role',
  },
  {
    id: 'lastLogin',
    label: 'Last Login',
  },
]

const rows: RowProps[] = [
  {
    id: 'carmelGreen',
    name: 'Carmel Green',
    email: 'emailaddress@myschoolworx.com',
    status: 'schedule',
    role: 'Teacher',
    lastLogin: '10.01.21',
  },
  {
    id: 'taylorSmith',
    name: 'Taylor Smith',
    email: 'emailaddress@myschoolworx.com',
    status: 'unavailable',
    role: 'Teacher',
    lastLogin: '10.01.21',
  },
  {
    id: 'narkissosHeracles',
    name: 'Narkissos Heracles',
    email: 'emailaddress@myschoolworx.com',
    status: 'available',
    role: 'Teacher',
    lastLogin: '10.01.21',
  },
  {
    id: 'ythereaErato',
    name: 'Cytherea Erato',
    email: 'emailaddress@myschoolworx.com',
    status: 'unavailable',
    role: 'Teacher',
    lastLogin: '10.01.21',
  },
  {
    id: 'ismeneMelaina',
    name: 'Ismene Melaina',
    email: 'emailaddress@myschoolworx.com',
    status: 'available',
    role: 'Teacher',
    lastLogin: '10.01.21',
  }
]

<Table
  headers={headers}
  rows={rows}
/>
```

For each row, you can enable a checkbox with the prop `hasCheckboxes` and an option button with the prop `hasOptions`.

```typescript
<Table
  // ...other props
  hasCheckboxes
  hasOptions
/>
```

But power is nothing without control, so you'll need a way to handle that data.

### Custom action buttons

To have access to the selected checkboxes you have to pass custom action buttons to the table.

There are two ways of doing so:

- 1. Creating your own custom action buttons component.
- 2. Providing an array of objects containing `key`, `onClick` and `renderItem`.

### 1) Custom action buttons component

```typescript
const CustomToolbarActionButtons: FC<SelectedRows> = ({ selectedRows }) => (
    <>
      <IconButton onClick={() => console.log('Edit rows:', selectedRows)}>
        <EditIcon />
      </IconButton>

      <IconButton onClick={() => console.log('Delete rows:', selectedRows)}>
        <DeleteIcon />
      </IconButton>
    </>
)

<Table
  // ...other props
  hasCheckboxes
  customToolbarActionButtons={({ selectedRows }) => (
    <CustomToolbarActionButtons selectedRows={selectedRows} />
  )}
/>
```

### 2) Custom action buttons array

```typescript
const actionButtons: SimpleActionButton[] = [
  {
    key: 'edit',
    onClick: ({ selectedRows }) => console.log('Edit rows:', selectedRows),
    renderItem: <EditIcon />,
  },

  {
    key: 'delete',
    onClick: ({ selectedRows }) => console.log('Delete rows:', selectedRows),
    renderItem: <DeleteIcon />,
  },
]

<Table
  // ...other props
  hasCheckboxes={showCheckboxes}
  customToolbarActionButtons={actionButtons} // Custom Toolbar items
/>
```

### Custom options

Similar to the selected checkboxes, you have to pass custom options to the table to access the row data.

There are two ways of doing so:

- 1. Creating your own custom options component.
- 2. Providing an array of objects containing `key`, `onClick` and `renderItem`.

### 1) Custom options component

```typescript
const CustomRowOptions: FC<CustomRowOptionsProps> = ({ row, close }) => {
  const handleMenuClick = (log: string) => () => {
    console.log(log, row)
    close()
  }

  return (
    <>
      <MenuItem onClick={handleMenuClick('Settings')}>
        <Settings />
      </MenuItem>
      <MenuItem onClick={handleMenuClick('Edit')}>Edit</MenuItem>
      <MenuItem onClick={handleMenuClick('Open')}>Open</MenuItem>
    </>
  )
}

;<Table
  // ...other props
  hasOptions
  customRowOptions={({ row, close }) => (
    <CustomRowOptions row={row} close={close} />
  )}
/>
```

### 2) Custom options array

```typescript
const optionButtons: SimpleOptionButton[] = [
  {
    key: 'edit',
    onClick: row => console.log('row:', row),
    renderItem: <EditIcon />,
  },
  {
    key: 'delete',
    onClick: row => console.log('row:', row),
    renderItem: <DeleteIcon />,
  },
  {
    key: 'click',
    onClick: row => console.log('row:', row),
    renderItem: 'click',
  },
]

<Table
  // ...other props
  hasOptions
  customRowOptions={optionButtons}
/>
```

## Forms

Rockets forms are powered by [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) which is based on [json-schema](https://json-schema.org/).

This combination makes it very clean and fast to create simple forms.

You'll create a schema and an uiSchema object to create your forms. Rockets and json-schema will take care of the rest.

First, you'll need to install v4 of "@rjsf/core" and "@rjsf/material-ui"

```typescript
$ npm install @rjsf/core @rjsf/utils --save
```

To be able to pass Rocket's custom components, you'll have yo provide the components overrides for each type through the `widgets` props of the form. But this is not mandatory. If you don't override it, the form will be populated with plain Material UI components.

```typescript
const widgets = {
  TextWidget: CustomTextFieldWidget,
  CheckboxWidget: CustomCheckboxWidget,
  CheckboxesWidget: CustomCheckboxesWidget,
  RadioWidget: CustomRadioWidget,
  SelectWidget: CustomSelectWidget,
}

<Form
  // ...other props
  widgets={widgets}
/>
```

### Simplest form

```typescript
import { withTheme, UiSchema, ISubmitEvent } from '@rjsf/core'

type FormData = {
  name: string
  email: string
}

const SimpleForm: FC = () => {
  const Form = withTheme(Theme)

  const widgets = {
    TextWidget: CustomTextFieldWidget,
  }

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string', title: 'Name' },
      email: { type: 'string', title: 'Email' },
    },
  }

  const uiSchema: UiSchema = {
    email: { 'ui:widget': 'email' },
  }

  const handleSubmit = (form: ISubmitEvent<FormData>) => {
    console.log('form values', form.formData)
  }

  return (
    <>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={handleSubmit}
        widgets={widgets}
        noHtml5Validate={true}
        showErrorList={false}
        onError={err => console.log('errors', err)}
      >
        <Button type="submit" fullWidth variant="contained">
          Add contact
        </Button>
      </Form>
    </>
  )
}
```

### Custom Validation

The `validate` prop allows you to add custom validations to the form data. The errors added to the form errors will be shown at the form UI.

```typescript
const validate = (formData: FormData, errors: FormValidation) => {
  if (!emailValidation(formData.email)) {
    errors.email.addError('please enter a valid email')
  }

  return errors
}

;<Form
  // ...other props
  validate={validate}
>
  <Button type="submit" fullWidth variant="contained">
    Add contact
  </Button>
</Form>
```

### Array Form

Rockets and Json Schema makes it easy to use array forms as well. It allows the user to add or remove fields as needed.

For this, you'll have to specify the `type: 'array'` inside the field.

```typescript
import {
  CustomTextFieldWidget,
  ArrayFieldTemplate,
} from 'app/styles/CustomWidgets'

const ArrayForm: FC = () => {
  const Form = withTheme(Theme)

  const widgets = {
    TextWidget: CustomTextFieldWidget,
  }

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', title: 'Name' },
      address: {
        type: 'array',
        title: 'Address',
        items: {
          title: 'Address',
          type: 'string',
        },
      },
    },
  }

  const formData = {
    address: [''], // This is needed to automatically create the first field of the address
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onSubmit={values => console.log('values', values.formData)}
      widgets={widgets}
      ArrayFieldTemplate={ArrayFieldTemplate}
      noHtml5Validate={true}
      showErrorList={false}
    >
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Send
      </Button>
    </Form>
  )
}
```

### Multiple Fields Array Form

If you need your array to be a group of items, you can add `type: 'object'` to your array's item object, and add a `properties` object containing the field you want to repeat inside the array.

```typescript
const schema: JSONSchema7 = {
  type: 'object',
  required: ['name', 'address'],
  properties: {
    name: { type: 'string', title: 'Name' },
    address: {
      type: 'array',
      title: 'Address',
      items: {
        type: 'object',
        required: ['name', 'city'],
        properties: {
          name: {
            title: 'Adress',
            type: 'string',
          },
          city: {
            title: 'City',
            type: 'string',
          },
          addressType: {
            title: 'Type of address',
            type: 'string',
            enum: ['House', 'Apartment', 'Comercial building'],
          },
          isPrimaryAddress: {
            title: 'Is home address',
            type: 'boolean',
            enum: [true, false],
          },
        },
      },
    },
  },
}

<Form
  schema={schema}
  onSubmit={values => console.log('values', values)}
  ArrayFieldTemplate={ArrayFieldTemplate}
>
  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
    Send
  </Button>
</Form>
```

### Other input types

Other types of inputs are also available: checkboxes, radio buttons, select and switch. These custom formats demands some simple extra steps on the form object.

You need to specify the `uiSchema` according to the format you want and also the custom widgets you'll use and pass it to the `widgets` prop of the form.

```typescript
import {
  CustomCheckboxWidget,
  CustomCheckboxesWidget,
  CustomRadioWidget,
  CustomSelectWidget,
} from 'app/styles/CustomWidgets'

type FormData = {
  checkboxSolo: boolean
  checkboxGroup: string[]
  radio: string
  select: string
}

const OtherFormElements: FC = () => {
  const Form = withTheme(Theme)

  const schema: JSONSchema7 = {
    type: 'object',
    properties: {
      checkboxSolo: {
        type: 'boolean',
        title: 'I agree to subscribe',
        enum: [true, false],
      },
      checkboxGroup: {
        type: 'array',
        title: 'A multiple choices list',
        items: {
          type: 'string',
          enum: ['foo', 'bar', 'fuzz', 'qux'],
        },
        uniqueItems: true,
      },
      radio: {
        type: 'string',
        title: 'Which is your favorite for gaming?',
        enum: ['PS5', 'Xbox', 'PC', 'Mobile'],
      },
      select: {
        type: 'string',
        title: "Who's your favorite character",
        enum: ['Mario', 'Sonic', 'Lara Croft', 'Pac-man'],
      },
    },
  }

  const widgets = {
    CheckboxWidget: CustomCheckboxWidget,
    CheckboxesWidget: CustomCheckboxesWidget,
    RadioWidget: CustomRadioWidget,
    SelectWidget: CustomSelectWidget,
  }

  const uiSchema: UiSchema = {
    checkboxSolo: {
      'ui:widget': 'checkbox', // Not really needed. Checkbox is default for boolean types.
    },
    checkboxGroup: {
      'ui:widget': 'checkboxes',
    },
    radio: {
      'ui:widget': 'radio',
    },
    select: {
      'ui:widget': 'select',
    },
  }

  const handleSubmit = (values: ISubmitEvent<FormData>) => {
    console.log('values', values.formData)
  }

  return (
    <>
      <Text
        variant="h4"
        fontFamily="Inter"
        fontSize={24}
        fontWeight={800}
        mt={4}
        gutterBottom
      >
        Other Form Elements
      </Text>

      <Box>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmit}
          widgets={widgets}
          noHtml5Validate={true}
          showErrorList={false}
          onError={err => console.log('errors', err)}
        >
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Submit
          </Button>
        </Form>
      </Box>
    </>
  )
}
```

### Switch input

Switch is just a different checkbox, so the usage is very similar.

```typescript
import { FC } from 'react'
import Box from '@mui/material/Box'
import Text from 'app/Components/Text'
import { withTheme, UiSchema, ISubmitEvent } from '@rjsf/core'
import { Theme } from '@rjsf/material-ui/v5'
import { JSONSchema7 } from 'json-schema'
import { CustomSwitchWidget } from 'app/styles/CustomWidgets'
import Button from 'app/Components/Button'

type FormData = {
  name: string
  email: string
  booleanWithCustomLabels: boolean
}

const OtherFormElements: FC = () => {
  const Form = withTheme(Theme)

  const schema: JSONSchema7 = {
    type: 'object',
    properties: {
      checkboxSolo: {
        type: 'boolean',
        title: 'I agree to subscribe',
        enum: [true, false],
      },
    },
  }

  const widgets = {
    CheckboxWidget: CustomSwitchWidget,
  }

  const uiSchema: UiSchema = {
    checkboxSolo: {
      'ui:widget': 'checkbox', // Not really needed. Checkbox is default for boolean types.
    },
  }

  return <Form schema={schema} uiSchema={uiSchema} widgets={widgets} />
}
```