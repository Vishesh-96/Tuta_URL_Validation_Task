import { describe, it, expect } from "vitest";
import { isValidUrlFormat } from "./url-validation";

describe("isValidUrlFormat", () => {
  it("accepts valid http URLs", () => {
    expect(isValidUrlFormat("https://tuta.com/pricing")).toBe(true);
    expect(isValidUrlFormat("http://example.com")).toBe(true);
  });

  it("rejects invalid or non-http URLs", () => {
    expect(isValidUrlFormat("not-a-url")).toBe(false);
    expect(isValidUrlFormat("ftp://example.com")).toBe(false);
  });
});
