import { render, fireEvent, screen } from '@testing-library/react'
import "@testing-library/jest-dom";
import PageHeader from './index'

describe('Page Header test', () => {
    test("bookmark button click action test", () => {
        const goToBookmark = jest.fn();
        render(<PageHeader onClick={goToBookmark}  bookmarkText='View BookMark'/>);

        const bookmarkButton = screen.getByRole("button");
        fireEvent.click(bookmarkButton);

        expect(goToBookmark).toHaveBeenCalled();
        expect(screen.getByText("View BookMark")).toBeInTheDocument();

      });
})