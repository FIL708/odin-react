import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Section from './Section'

describe('Section', () => {
    it('should render properly', () => {
        render(<Section />)
        const element = screen.getByText('Section Component')
        expect(element).toBeInTheDocument()
    })
})
