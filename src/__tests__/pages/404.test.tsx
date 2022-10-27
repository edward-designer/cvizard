import { render, screen } from '@testing-library/react';

import NotFoundPage from '@/pages/404';

// workaround for not being able to render SVG imports
// tried https://github.com/vercel/next.js/issues/35634  https://lightrun.com/answers/storybookjs-storybook-using-svg-as-react-component-inside-story-causes-error---v600-rc26
jest.mock('~/svg/*.svg', () => ({
  __esModule: true,
  default: () => <div />,
}));

describe('404', () => {
  it('renders a heading', () => {
    render(<NotFoundPage />);

    const heading = screen.getByText(/not found/i);

    expect(heading).toBeInTheDocument();
  });
});
