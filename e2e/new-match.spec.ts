import { expect, test } from "@playwright/test"
test.describe("New Match", () => {
  test("should create a new match", async ({ page }) => {
    await page.goto("http://localhost:3000/")

    await page
      .getByRole("row", { name: "D D 1 1035" })
      .locator('div:has-text("D")')
      .click()
    await expect(page).toHaveURL(
      "http://localhost:3000/user/9c66ffa0-05f9-4ea8-815b-e5c3c39c0299"
    )

    await expect(
      page.locator(
        "xpath=/html/body/div[1]/div/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/dl/dd[1]"
      )
    ).toHaveText("1035")

    await page.locator('button[name="Menu button"]').click()

    await page.getByText("Register match").click()
    await expect(page).toHaveURL("http://localhost:3000/new-match")

    await page.locator(".Radio__Container-sc-c2054353-0").first().click()

    await page
      .locator("div:nth-child(2) > .Radio__Container-sc-c2054353-0")
      .click()

    await page
      .locator("div:nth-child(3) > .Radio__Container-sc-c2054353-0")
      .click()

    await page
      .locator("div:nth-child(4) > .Radio__Container-sc-c2054353-0")
      .click()

    await page.getByRole("button", { name: "Next" }).click()

    await page
      .getByRole("button", { name: "Select corporation" })
      .first()
      .click()

    await page
      .getByRole("dialog", { name: "Select corporation Close" })
      .locator('div:has-text("㨐Cheung Shing ■■MARS■■")')
      .nth(1)
      .click()

    await page.locator('input[type="text"]').first().click()

    await page.locator('input[type="text"]').first().fill("88")

    await page
      .getByRole("button", { name: "Select corporation" })
      .first()
      .click()

    await page
      .getByRole("dialog", { name: "Select corporation Close" })
      .locator('div:has-text("credicor")')
      .nth(1)
      .click()

    await page.locator('input[type="text"]').nth(1).click()

    await page.locator('input[type="text"]').nth(1).fill("87")

    await page
      .getByRole("button", { name: "Select corporation" })
      .first()
      .click()

    await page
      .getByRole("dialog", { name: "Select corporation Close" })
      .locator('div:has-text("ecoline")')
      .nth(1)
      .click()

    await page.locator('input[type="text"]').nth(2).click()

    await page.locator('input[type="text"]').nth(2).fill("86")

    await page.getByRole("button", { name: "Select corporation" }).click()

    await page
      .getByRole("dialog", { name: "Select corporation Close" })
      .locator('div:has-text("helion")')
      .nth(1)
      .click()

    await page.locator('input[type="text"]').nth(3).click()

    await page.locator('input[type="text"]').nth(3).fill("85")

    await page.getByRole("button", { name: "Next" }).click()

    await page.getByRole("button", { name: "Register match" }).click()
    await expect(page).toHaveURL("http://localhost:3000/")

    await page
      .getByRole("row", { name: "D D 1 1056" })
      .locator('div:has-text("D")')
      .click()
    await expect(page).toHaveURL(
      "http://localhost:3000/user/9c66ffa0-05f9-4ea8-815b-e5c3c39c0299"
    )

    await expect(
      page.locator(
        "xpath=/html/body/div[1]/div/div[2]/div/div[2]/div[1]/div[1]/div[2]/div/dl/dd[1]"
      )
    ).toHaveText("1056")
  })
})
