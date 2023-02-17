/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import BlogForm from './BlogForm';

describe('BlogForm', () => {
  test('calls the function with the right data', async () => {
    let blogContent = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
    };

    const createMock = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm createBlog={createMock} />);

    const titleInput = container.querySelector('input[name="Title"]');
    const authorInput = container.querySelector('input[name="Author"]');
    const urlInput = container.querySelector('input[name="URL"]');
    const submitBtn = screen.getByText('create');

    await user.type(titleInput, blogContent.title);
    await user.type(authorInput, blogContent.author);
    await user.type(urlInput, blogContent.url);
    await user.click(submitBtn);

    expect(createMock.mock.calls).toHaveLength(1);
    expect(createMock.mock.calls[0][0].title).toBe(blogContent.title);
    expect(createMock.mock.calls[0][0].author).toBe(blogContent.author);
    expect(createMock.mock.calls[0][0].url).toBe(blogContent.url);
  });
});
