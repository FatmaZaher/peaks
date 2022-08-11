import { render, fireEvent, screen } from '@testing-library/react'
import "@testing-library/jest-dom";
import Header from './index'

describe('Header test', () => {

    test("render component", () => {
        render(<Header />);
    });

    test("render component with expect text", () => {
        render(<Header />);
        expect(screen.getByPlaceholderText("Search all news")).toBeInTheDocument();

    });

    test("input should contain the value of the search", () => {
        render(<Header />);
        const input = screen.getByPlaceholderText("Search all news")
        fireEvent.change(input, { target: { value: "test input" } });
        expect(input.value).toBe("test input");
    });

})