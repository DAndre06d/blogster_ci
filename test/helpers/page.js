const puppeteer = require("puppeteer");
const sessionFactory = require("../factories/sessionFactory");

class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();
        const cutomPage = new CustomPage(page);
        return new Proxy(cutomPage, {
            get: function (target, property) {
                return (
                    cutomPage[property] || browser[property] || page[property]
                );
            },
        });
    }
    constructor(page) {
        this.page = page;
    }
    async login() {
        const { session, sig } = sessionFactory();
        await this.page.setCookie({
            name: "session",
            value: session,
        });
        await this.page.setCookie({ name: "session.sig", value: sig });
        await this.page.goto("localhost:3000/blogs");
        //wait for
        await this.page.waitFor('a[href="/auth/logout"]');
    }

    async getContentsOf(selector) {
        return this.page.$eval(selector, (el) => el.innerHTML);
    }
    async get(path) {
        return await this.page.evaluate(async (_path) => {
            const response = await fetch(_path, {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        }, path);
    }

    async post(path, data) {
        return await this.page.evaluate(
            async (_path, _data) => {
                const response = await fetch(_path, {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: _data.title,
                        content: _data.content,
                    }),
                });
                return response.json();
            },
            path,
            data
        );
    }
}

module.exports = CustomPage;
