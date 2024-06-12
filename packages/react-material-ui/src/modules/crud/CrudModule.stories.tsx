import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import CrudModule from './index';

const meta = {
  title: 'Example/CrudModule',
  component: CrudModule,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof CrudModule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Users',
    resource: 'user',
    tableProps: {
      tableSchema: [
        {
          id: 'id',
          label: 'ID',
        },
        {
          id: 'name',
          label: 'Name',
        },
        {
          id: 'email',
          label: 'Email',
        },
        {
          id: 'age',
          label: 'Age',
        },
      ],
      // filters: [
      //   {
      //     id: 'name',
      //     label: 'Search',
      //     operator: 'contL',
      //     type: 'text',
      //     columns: 4,
      //   },
      //   {
      //     id: 'school',
      //     label: 'Full Name',
      //     operator: 'contL',
      //     type: 'text',
      //     columns: 4,
      //   },
      //   {
      //     id: 'userType',
      //     label: 'Select',
      //     operator: 'eq',
      //     type: 'select',
      //     columns: 4,
      //     options: [
      //       {
      //         label: 'School Staff',
      //         value: 'SCHOOL_STAFF',
      //       },
      //       {
      //         label: 'Student',
      //         value: 'STUDENT',
      //       },
      //       {
      //         label: 'Parent',
      //         value: 'PARENT',
      //       },
      //     ],
      //   },
      // ],
    },
    hideDeleteButton: true,
    // createFormProps={{
    //   formSchema: commonSchema,
    // }}
    // detailsFormProps={{
    //   formSchema: commonSchema,
    // }}
  },
};
