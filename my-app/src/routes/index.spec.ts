/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import Index from './index.svelte'

test('shows proper heading when rendered', () => {
    const { getByText } = render(Index)

    expect(getByText('Welcome to SvelteKit')).toBeInTheDocument()
})