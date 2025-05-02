import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Input from './Input'

describe('Input', () => {
    it('should render properly', () => {
        render(<Input />)
        const element = screen.getByText('Input Component')
        expect(element).toBeInTheDocument()
    })
})
