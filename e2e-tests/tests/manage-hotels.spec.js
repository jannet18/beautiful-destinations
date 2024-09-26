const { test, expect } = require("@playwright/test");
import path from "path";

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

test("should allow a user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator('[ name="name" ]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").click();
  await page.getByLabel("Parking").click();

  await page.locator('[name="adultCount"]').fill("3");
  await page.locator('[name="childCount"]').fill("2");
  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpeg"),
    path.join(__dirname, "files", "2.jpeg"),
    path.join(__dirname, "files", "3.jpeg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  // await page.reload();
  await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 5300 });
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await expect(
    page.getByText("Elementaita Resort, hotel & Conferencing")
  ).toBeVisible();
  await expect(
    page.getByText("Only a one and a half hour drive from Nairobi")
  ).toBeVisible();
  await expect(page.getByText("Naivasha, Kenya").first()).toBeVisible();
  await expect(page.getByText("All Inclusive").first()).toBeVisible();
  await expect(page.getByText("Ksh 119 per Night")).toBeVisible();
  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
  await expect(page.getByText("2 Star Rating").first()).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

// test("should edit an hotel", async ({ page }) => {
//   await page.goto(`${UI_URL}/my-hotels`);

//   await page.getByRole("link", { name: "View Details" }).first().click();

//   await page.waitForSelector('[name="name"]', { state: "attached" });
//   await expect(page.locator('[name="name"]')).toHaveValue(
//     "Elementaita Resort, hotel & Conferencing"
//   );
//   await page.locator('[name="name"]').fill("Elementaita Resort!");
//   await page.getByRole("button", { name: "Save" }).click();
//   await expect(page.getByText("Hotel Updated!")).toBeVisible({
//     timeout: 10000,
//   });

//   await page.reload();
//   await page.waitForLoadState("domcontentloaded");

//   await page.waitForSelector('[name="name"]', { state: "attached" });

//   // const currentValue = await page.locator('[name="name"]').inputValue();
//   // console.log("current input value", currentValue);

//   await expect(page.locator('[name="name"]')).toHaveValue(
//     "Elementaita Resort!"
//   );

//   await page
//     .locator('[name="name"]')
//     .fill("Elementaita Resort, hotel & Conferencing");
//   await page.getByRole("button", { name: "Save" }).click();
//   await expect(page.getByText("Hotel Updated!")).toBeVisible({
//     timeout: 10000,
//   });
// });

test("should edit a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue(
    "Elementaita Resort, hotel & Conferencing"
  );

  await page.locator('[name="name"]').fill("Elementaita Resort!");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Updated!")).toBeVisible({
    timeout: 10000,
  });

  await page.reload();
  await page.waitForLoadState("domcontentloaded");
  await page.reload();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue(
    "Elementaita Resort!"
  );

  await page
    .locator('[name="name"]')
    .fill("Elementaita Resort, hotel & Conferencing");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Updated!")).toBeVisible({
    timeout: 10000,
  });
});
