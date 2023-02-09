import { faker } from '@faker-js/faker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactElement } from 'react';

import Dropdown from './index';
import { IOptionProps } from './parts/Option';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  argTypes: {
    allowClear: { control: 'boolean' },
    closeAfterChange: { control: 'boolean' },
  },
} as ComponentMeta<typeof Dropdown>;

const options = (count: number): { label: string; value: string }[] =>
  new Array(count).fill(undefined).map(() => ({
    value: faker.datatype.uuid(),
    label: faker.company.name(),
  }));

const aaa = [1, 2, 3];
const XXXXXXXXXXXXXXXXXXX: ReactElement<IOptionProps>[] = aaa.map(item => (
  <Dropdown.Option key={item} value={'g1.1'}>
    1 menu item
  </Dropdown.Option>
));

const Template: ComponentStory<typeof Dropdown> = args => (
  <Dropdown {...args}>
    {options(3).map(({ value, label }) => (
      <Dropdown.Option key={value} value={value}>
        {label}
      </Dropdown.Option>
    ))}

    {XXXXXXXXXXXXXXXXXXX}

    <Dropdown.Group key="g1" title="Group 1">
      <Dropdown.Option key="g1.1" value="g1.1">
        1 menu item
      </Dropdown.Option>
      <Dropdown.Option key="g1.2" value="g1.2">
        2 menu item
      </Dropdown.Option>
      <Dropdown.Option key="g1.3" value="g1.3" disabled>
        3 menu item
      </Dropdown.Option>
      <Dropdown.Option key="g1.4" value="g1.4" disabled>
        4 menu item
      </Dropdown.Option>
    </Dropdown.Group>

    <Dropdown.Group key="g2" title="Group 2" disabled>
      <Dropdown.Option key="g2.1" value="g2.1">
        1 menu item
      </Dropdown.Option>
      <Dropdown.Option key="g2.2" value="g2.2">
        2 menu item
      </Dropdown.Option>
      <Dropdown.Option key="g2.3" value="g2.3">
        3 menu item
      </Dropdown.Option>
      <Dropdown.Option key="g2.4" value="g2.4">
        4 menu item
      </Dropdown.Option>

      <Dropdown.Group key="g2.0.1" title="Group 2.5">
        <Dropdown.Option key="g2.1.1" value="g2.1.1">
          1 menu item
        </Dropdown.Option>
        <Dropdown.Option key="g2.2.1" value="g2.2.1">
          2 menu item
        </Dropdown.Option>
        <Dropdown.Option key="g2.3.1" value="g2.3.1">
          3 menu item
        </Dropdown.Option>
        <Dropdown.Option key="g2.4.1" value="g2.4.1">
          4 menu item
        </Dropdown.Option>
      </Dropdown.Group>
    </Dropdown.Group>

    <Dropdown.Option key="4" value="4">
      4 menu item
    </Dropdown.Option>
    <Dropdown.Option key="5" value="5">
      Extra large menu item text with super duper mega large description
    </Dropdown.Option>
  </Dropdown>
);

export const Primary = Template.bind({});
Primary.args = {
  // label: 'Button',
  // primary: true,
};

/*
export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
*/
