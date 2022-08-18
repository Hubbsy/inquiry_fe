import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the template header', () => {
    render(<App />);
    const linkElement = screen.getByText(/React Frontend Template/i);
    expect(linkElement).toBeInTheDocument();
});
