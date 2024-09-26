// @ts-check
const { test, expect } = require("@playwright/test");

const UI_URL = "http://localhost:5173/";
test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("checkbox")).toBeChecked();

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible({
    timeout: 1000,
  });
  await page.reload({ timeout: 10000 });
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible({
    timeout: 10000,
  });

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible({
    timeout: 10000,
  });
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an Account here" }).click();

  await expect(
    page.getByRole("heading", { name: "Create An Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("checkbox")).toBeChecked();

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Successful!")).toBeVisible();
  await page.reload({ timeout: 10000 });
  await page.waitForLoadState();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible({
    timeout: 10000,
  });

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible({
    timeout: 10000,
  });
});
