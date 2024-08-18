import type { Meta, StoryObj } from '@storybook/react';
import Card, { CardVariant } from '@components/stdlib/card/Card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UiLib/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <h1>Card</h1>
        <p>Card content</p>
      </>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brutalist: Story = {
  args: {
    variant: CardVariant.BRUTALIST,
  },
};

export const Turbo: Story = {
  args: {
    variant: CardVariant.TURBO,
    style: {
      width: '400px',
      justifyContent: 'center',
      textAlign: 'center',
      height: '300px',
    },
  },
};
