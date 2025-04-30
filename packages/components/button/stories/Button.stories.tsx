import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost', 'link'],
      description: '按钮变体风格',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '按钮尺寸',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success', 'warning'],
      description: '按钮颜色',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '是否使用全宽',
    },
    loading: {
      control: { type: 'boolean' },
      description: '加载状态',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '按钮',
  },
};

export const Variants: Story = {
  render: () => (
    <div className='flex gap-4 flex-wrap'>
      <Button variant='solid'>实心按钮</Button>
      <Button variant='outline'>轮廓按钮</Button>
      <Button variant='ghost'>幽灵按钮</Button>
      <Button variant='link'>链接按钮</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4 flex-wrap'>
      <Button size='sm'>小型按钮</Button>
      <Button size='md'>中型按钮</Button>
      <Button size='lg'>大型按钮</Button>
      <Button size='xl'>超大按钮</Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 flex-wrap'>
        <Button color='primary'>主要按钮</Button>
        <Button color='secondary'>次要按钮</Button>
        <Button color='danger'>危险按钮</Button>
        <Button color='success'>成功按钮</Button>
        <Button color='warning'>警告按钮</Button>
      </div>
      <div className='flex gap-4 flex-wrap'>
        <Button variant='outline' color='primary'>
          主要按钮
        </Button>
        <Button variant='outline' color='secondary'>
          次要按钮
        </Button>
        <Button variant='outline' color='danger'>
          危险按钮
        </Button>
        <Button variant='outline' color='success'>
          成功按钮
        </Button>
        <Button variant='outline' color='warning'>
          警告按钮
        </Button>
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    children: '加载中',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '禁用按钮',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: '全宽按钮',
  },
};

export const Icons: Story = {
  render: () => (
    <div className='flex gap-4 flex-wrap'>
      <Button
        leftIcon={
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M5 12h14M12 5l7 7-7 7' />
          </svg>
        }
      >
        左侧图标
      </Button>
      <Button
        rightIcon={
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M5 12h14M12 5l7 7-7 7' />
          </svg>
        }
      >
        右侧图标
      </Button>
    </div>
  ),
};
