import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Button from './Button'

describe('Button', () => {
    it('should render properly', () => {
        render(<Button />)
        const element = screen.getByText('Button Component')
        expect(element).toBeInTheDocument()
    })
})
