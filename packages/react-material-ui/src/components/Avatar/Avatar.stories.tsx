import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: { type: 'text' } },
    alt: { control: { type: 'text' } },
    size: { control: { type: 'range', min: 10, max: 200, step: 5 } },
    initials: { control: { type: 'text' } },
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://ca.slack-edge.com/T02996B3M-U043VNBUQP7-db78326ad0ea-512',
    alt: 'Avatar image',
    size: 70,
  },
};

export const FailUrl: Story = {
  args: {
    src: 'https://ca.slack-edge.com/T12',
    alt: 'Avatar image',
    size: 70,
  },
};
