const { test, expect } = require("@playwright/test");

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("checkbox")).toBeChecked();

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("Should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Lake Elementaita");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Naivasha")).toBeVisible();
  await expect(page.getByText("Lake Elementaita Manor")).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Elementaita");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Elementaita Resort!").click();
  await expect(page).toHaveURL(/details/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Elementaita");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];

  await page.getByPlaceholder("Check-out Date").fill(formattedDate);
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Elementaita Resort").click();
  await page.getByRole("button", { name: "Book Now" }).click();
  await expect(page.getByText("Total Cost: Ksh 119")).toBeTruthy();

  const stripeFrame = page.frameLocator("iframe").first();
  // await stripeFrame.locator('[placeholder="Card number"]');
  await stripeFrame
    .locator('[title="Secure card number input frame"]')
    .locator('input[name="cardnumber"]')
    .fill("4242424242424242");
  await stripeFrame
    .locator('[title="Secure expiration date input frame"]')
    .locator('input[name="exp-date"]')
    .fill("01/50");
  await stripeFrame
    .locator('[title="Secure CVC input frame"]')
    .locator('input[name="cvc"]')
    .fill("12334");

  // await stripeFrame.locator('[placeholder="MM / YY"]').fill("05/30");
  // await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  // await stripeFrame.locator('[placeholder="ZIP"]').fill("34234");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();

  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Elementaita Resort!")).toBeVisible();
});

// test("should book hotel", async ({ page }) => {
//   await page.goto(UI_URL);

//   await page.getByPlaceholder("Where are you going?").fill("Elementaita");

//   const date = new Date();
//   date.setDate(date.getDate() + 3);
//   const formattedDate = date.toISOString().split("T")[0];

//   await page.getByPlaceholder("Check-out Date").fill(formattedDate);
//   await page.getByRole("button", { name: "Search" }).click();

//   await page.getByText("Elementaita Resort").click();
//   await page.getByRole("button", { name: "Book Now" }).click();
//   expect(page.getByText("Total Cost: Ksh 119")).toBeTruthy();

//   // Handling Stripe iframe for Card number
//   const cardNumberFrame = page.frameLocator(
//     "iframe[name='__privateStripeFrame4']"
//   );
//   await cardNumberFrame
//     .locator('[placeholder="Card number"]')
//     .fill("4242424242424242");

//   // Handling Stripe iframe for Expiry Date
//   const expiryFrame = page.frameLocator("iframe[name='__privateStripeFrame5']");
//   await expiryFrame.locator('[placeholder="MM / YY"]').fill("05/30");

//   // Handling Stripe iframe for CVC
//   const cvcFrame = page.frameLocator("iframe[name='__privateStripeFrame6']");
//   await cvcFrame.locator('[placeholder="CVC"]').fill("242");

//   // Handling ZIP (if applicable)
//   const zipFrame = page.frameLocator("iframe[name='__privateStripeFrame7']");
//   await zipFrame.locator('[placeholder="ZIP"]').fill("34234");

//   await page.getByRole("button", { name: "Confirm Booking" }).click();
//   await expect(page.getByText("Booking Saved!")).toBeVisible();
// });
