import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Button',
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        text: 'Primary',
    },
}

export const Accept: Story = {
    args: {
        text: 'Accept',
        accept: true,
    },
}

export const Disabled: Story = {
    args: {
        text: 'Accept',
        disabled: true,
    },
}
