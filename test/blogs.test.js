const Page = require("./helpers/page");
let page;
jest.setTimeout(35000);
beforeEach(async () => {
    page = await Page.build();
    await page.goto("localhost:3000");
});

afterEach(async () => {
    await page.close();
});

describe("When loggedin", async () => {
    beforeEach(async () => {
        await page.login();
        await page.click("a.btn-floating");
    });
    test("can see the add blog button('+')", async () => {
        const label = await page.getContentsOf("form label");
        expect(label).toEqual("Blog Title");
    });
    describe("And using valid inputs", async () => {
        beforeEach(async () => {
            await page.type(".title input", `My Title`);
            await page.type(".content input", "Contents test");
            await page.click("form button");
        });
        test("submitting takes user to review screen", async () => {
            const confirmText = await page.getContentsOf("h5");
            expect(confirmText).toEqual("Please confirm your entries");
        });
        test("submitting adds blog to index(blogs) page", async () => {
            await page.click("button.green");
            await page.waitFor(".card");
            const title = await page.getContentsOf(".card-title");
            const content = await page.getContentsOf("p");

            expect(title).toEqual("My Title");
            expect(content).toEqual("Contents test");
        });
    });
    describe("And using invalid inputs", async () => {
        beforeEach(async () => {
            await page.click("form button");
        });
        test("the form show error message", async () => {
            const titleError = await page.getContentsOf(".title .red-text");

            const contentError = await page.getContentsOf(".content .red-text");
            expect(titleError).toEqual("You must provide a value");
            expect(contentError).toEqual("You must provide a value");
        });
    });
});

describe("user is not logged in", async () => {
    test("User Cannot create blog post", async () => {
        const result = await page.post("/api/blogs", {
            title: "My eyeball",
            content: "My content",
        });
        expect(result).toEqual({ error: "You must log in!" });
    });

    test("User connot get a list of posts", async () => {
        const result = await page.get("/api/blogs");
        expect(result).toEqual({ error: "You must log in!" });
    });
});
