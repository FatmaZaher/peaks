import { render, fireEvent, screen } from '@testing-library/react'
import "@testing-library/jest-dom";
import CardNew from './index'
import { data } from '../../api/mock'

const datamock = data.results[0];
const webTitle = data.results[0].webTitle;

describe('CardNew Test', () => {
  test("render component", () => {
    render(<CardNew item={datamock} />);
  });

  test("render component with expect text", () => {
    render(<CardNew item={datamock} />);
    expect(screen.getByText(webTitle)).toBeInTheDocument();
  });

})