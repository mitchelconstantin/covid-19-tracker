import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { WorldWideDashboard } from "./WorldWideDashboard";

describe("WorldWideDashboard component rendering", () => {
  it("first tab should load by default, content should toggle when clicking tabs", () => {
    const { getByTestId, getByText } = render(<WorldWideDashboard />);

    const baseForm = getByTestId("base-form");
    const dataView = getByTestId("data-view");
    const colorSelector = getByTestId("color-selector");
    const aboutSection = getByTestId("about");

    const testDataViewTabRender = () => {
      expect(baseForm).toBeVisible();
      expect(dataView).toBeVisible();
      expect(colorSelector).not.toBeVisible();
      expect(aboutSection).not.toBeVisible();
    };

    const testColorSelectTabRender = () => {
      expect(baseForm).toBeVisible();
      expect(dataView).not.toBeVisible();
      expect(colorSelector).toBeVisible();
      expect(aboutSection).not.toBeVisible();
    };

    const testAboutTabRender = () => {
      expect(baseForm).toBeVisible();
      expect(dataView).not.toBeVisible();
      expect(colorSelector).not.toBeVisible();
      expect(aboutSection).toBeVisible();
    };

    testDataViewTabRender();

    fireEvent.click(getByText("Choose Colors"));
    testColorSelectTabRender();

    fireEvent.click(getByText("Data View"));
    testDataViewTabRender();

    fireEvent.click(getByText("About"));
    testAboutTabRender();
  });
});
