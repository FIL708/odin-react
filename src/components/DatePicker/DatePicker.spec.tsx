import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DatePicker from './DatePicker'

describe('DatePicker', () => {
    it('should render properly', () => {
        render(<DatePicker />)
        const element = screen.getByText('DatePicker Component')
        expect(element).toBeInTheDocument()
    })
})
