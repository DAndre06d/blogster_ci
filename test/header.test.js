const Page = require("./helpers/page");
let page;
jest.setTimeout(35000);
beforeEach(async () => {
    page = await Page.build();
    await page.goto("http://localhost:3000");
});

afterEach(async () => {
    await page.close();
});

/////////TESTS
test("the header has the correct texts", async () => {
    const text = await page.getContentsOf("a.brand-logo");
    expect(text).toEqual("Blogster");
});

test("clicking login starts oauth flow", async () => {
    await page.click(".right a");
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
});

test("When signed in, shows log out button", async () => {
    await page.login();
    //get the element of the logout button
    const text = await page.getContentsOf('a[href="/auth/logout"]');

    expect(text).toEqual("Logout");
});
