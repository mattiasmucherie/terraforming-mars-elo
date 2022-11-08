import { expect, test } from "@playwright/test"
test.describe("New Match", () => {
  test("should create a new match and update elo accordingly", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/")

    const eloTable = await page.locator('[data-test-id="elo-table"]')
    await expect(eloTable.locator("tr >> nth=1 >> td >> nth=2")).toHaveText(
      "1035"
    )
    await expect(eloTable.locator("tr >> nth=2 >> td >> nth=2")).toHaveText(
      "1011"
    )
    await expect(eloTable.locator("tr >> nth=3 >> td >> nth=2")).toHaveText(
      "994"
    )

    await page.locator('button[name="Menu button"]').click()
    await page.getByText("Register match").click()
    await expect(page).toHaveURL("http://localhost:3000/new-match")
    await page.locator(".Radio__Container-sc-c2054353-0").first().click()
    await page.locator(".Radio__Container-sc-c2054353-0 >> nth=1").click()
    await page.locator(".Radio__Container-sc-c2054353-0 >> nth=2").click()
    await page.locator(".Radio__Container-sc-c2054353-0 >> nth=3").click()

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

    const newEloTable = await page.locator('[data-test-id="elo-table"]')
    await expect(newEloTable.locator("tr >> nth=1 >> td >> nth=2")).toHaveText(
      "1056"
    )
    await expect(newEloTable.locator("tr >> nth=2 >> td >> nth=2")).toHaveText(
      "1018"
    )
    await expect(newEloTable.locator("tr >> nth=3 >> td >> nth=2")).toHaveText(
      "987"
    )
  })
  test("should create a new match and update elo accordingly with drawn games", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/")

    const eloTable = await page.locator('[data-test-id="elo-table"]')
    await expect(eloTable.locator("tr >> nth=1 >> td >> nth=2")).toHaveText(
      "1056"
    )
    await expect(eloTable.locator("tr >> nth=2 >> td >> nth=2")).toHaveText(
      "1018"
    )
    await expect(eloTable.locator("tr >> nth=3 >> td >> nth=2")).toHaveText(
      "987"
    )

    await page.locator('button[name="Menu button"]').click()
    await page.getByText("Register match").click()
    await expect(page).toHaveURL("http://localhost:3000/new-match")
    await page.locator(".Radio__Container-sc-c2054353-0").first().click()
    await page.locator(".Radio__Container-sc-c2054353-0 >> nth=1").click()
    await page.locator(".Radio__Container-sc-c2054353-0 >> nth=2").click()
    await page.locator(".Radio__Container-sc-c2054353-0 >> nth=3").click()

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

    await page.locator('input[type="text"]').nth(1).fill("88")
    await page.locator('input[type="text"]').nth(1).click()
    await page.locator('input[type="text"]').nth(1).fill("54")
    await page.locator('input[type="text"]').nth(3).click()
    await page.locator('input[type="text"]').nth(3).fill("55")

    await page
      .getByRole("button", { name: "Select corporation" })
      .first()
      .click()

    await page
      .getByRole("dialog", { name: "Select corporation Close" })
      .locator('div:has-text("ecoline")')
      .nth(1)
      .click()

    await page.locator('input[type="text"]').nth(4).click()

    await page.locator('input[type="text"]').nth(4).fill("86")

    await page.getByRole("button", { name: "Select corporation" }).click()

    await page
      .getByRole("dialog", { name: "Select corporation Close" })
      .locator('div:has-text("helion")')
      .nth(1)
      .click()

    await page.locator('input[type="text"]').nth(5).click()

    await page.locator('input[type="text"]').nth(5).fill("85")

    await page.getByRole("button", { name: "Next" }).click()

    await page.getByRole("button", { name: "Register match" }).click()
    await expect(page).toHaveURL("http://localhost:3000/")

    const newEloTable = await page.locator('[data-test-id="elo-table"]')
    await expect(newEloTable.locator("tr >> nth=1 >> td >> nth=2")).toHaveText(
      "1059"
    )
    await expect(newEloTable.locator("tr >> nth=2 >> td >> nth=2")).toHaveText(
      "1041"
    )
    await expect(newEloTable.locator("tr >> nth=3 >> td >> nth=2")).toHaveText(
      "980"
    )
  })
})
