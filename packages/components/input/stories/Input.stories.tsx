import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '输入框尺寸',
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'unstyled'],
      description: '输入框样式变体',
    },
    error: {
      control: 'boolean',
      description: '错误状态',
    },
    errorMessage: {
      control: 'text',
      description: '错误提示信息',
    },
    fullWidth: {
      control: 'boolean',
      description: '是否占满容器宽度',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '请输入内容',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <Input size='sm' placeholder='小尺寸 (sm)' />
      <Input size='md' placeholder='中等尺寸 (md) - 默认' />
      <Input size='lg' placeholder='大尺寸 (lg)' />
      <Input size='xl' placeholder='超大尺寸 (xl)' />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <Input variant='outline' placeholder='轮廓样式 (outline) - 默认' />
      <Input variant='filled' placeholder='填充样式 (filled)' />
      <Input variant='unstyled' placeholder='无样式 (unstyled)' />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    placeholder: '带错误提示的输入框',
    error: true,
    errorMessage: '此字段不能为空',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '已禁用的输入框',
    disabled: true,
  },
};

export const WithFullWidth: Story = {
  args: {
    placeholder: '占满容器宽度的输入框',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};
