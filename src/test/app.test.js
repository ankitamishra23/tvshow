import React from 'react';
import App from '../router/App';
import NotFound from '../Components/NotFoundPage'
import Dashboard from '../Components/dashboard/Dashboard'
import MovieDetailPage from '../Components/movieDetailPage/MovieDetailPage'

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../Components/dashboard/Dashboard');
jest.mock('../Components/movieDetailPage/MovieDetailPage');
jest.mock('../Components/NotFoundPage');

describe("Tests for App Router", () => {
  test("Should render page header and HomePage on default route", () => {
    // Arrange
    Dashboard.mockImplementation(() => <div>DashBoardPageMock</div>);

    // Act
    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("DashBoardPageMock")).toBeInTheDocument();
  });

  test("Should render page header and movieDetailPage for detail route", () => {
    // Arrange
    MovieDetailPage.mockImplementation(() => <div>MovieDetailPageMock</div>);

    // Act
    render(
      <MemoryRouter initialEntries={['/movieDetailPage']}>
        <App/>
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("MovieDetailPageMock")).toBeInTheDocument();
  });


  test("Should render page header and PageNotFound for invalid route", () => {
    // Arrange
    NotFound.mockImplementation(() => <div>NotFoundPageMock</div>);

    // Act
    render(
      <MemoryRouter initialEntries={['/*']}>
        <App/>
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("NotFoundPageMock")).toBeInTheDocument();
  });
});