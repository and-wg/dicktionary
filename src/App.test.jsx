import {render, screen} from "@testing-library/react"
import {it, expect} from "vitest"
import App from "./App"

it("should render", () => {
    render(<App/>)
    expect(screen.getByText("Ordbok"))
    expect()
})