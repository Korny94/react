import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductListing.jsx";

describe("ProductCard", () => {
  test("displays information correctly", () => {
    const mockCallback = jest.fn();
    render(
      <ProductCard
        title="Milk"
        description="It's good for you"
        price="19.99"
        onAddToCartClick={mockCallback}
      />
    );

    const addToCartButton = screen.getByRole("button");
    fireEvent.click(addToCartButton);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
