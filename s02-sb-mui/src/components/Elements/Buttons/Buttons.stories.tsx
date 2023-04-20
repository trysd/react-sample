import { Meta, Story } from '@storybook/react';
import DialogClose from './DialogClose';
import DialogOpen from './DialogOpen';

const _Default = () => {
  return (
    <>
     <DialogClose />
     <DialogOpen />
    </>
  )
}

const meta: Meta = {
  title: 'src/components/Elements/Buttons',
  component: _Default,
  parameters: {
    controls: { expanded: false },
  },
};
export default meta;

const Template: Story = () => <_Default />;

export const Default = Template.bind({});
Default.args = {};
