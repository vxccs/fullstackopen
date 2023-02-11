/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Blog from './Blog';

describe('Togglable', () => {
  let container;
  let user = {
    name: 'test',
    username: 'test',
  };
  let blogContent = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: user,
  };

  const updateMock = jest.fn();
  const removeMock = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={blogContent} updateBlog={updateMock} removeBlog={removeMock} user={user} />
    ).container;
  });

  test('blog displays title and author', async () => {
    await screen.findAllByText(`${blogContent.title} by ${blogContent.author}`);
  });

  test('does not find url or likes', async () => {
    const div = container.querySelector('.blogContent');
    expect(div).toBe(null);
  });

  test('after clicking the button, url and likes show', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const div = container.querySelector('.blogContent');
    expect(div).not.toBe(null);
  });

  test('liking twice returns 2 function calls', async () => {
    const user = userEvent.setup();
    const viewBtn = screen.getByText('view');
    await user.click(viewBtn);

    const likeBtn = screen.getByText('like');
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(updateMock.mock.calls).toHaveLength(2);
  });
});
