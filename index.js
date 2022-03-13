const fs = require("fs");
const matter = require("gray-matter");
const md = require("markdown-it")({ html: true });

let template = fs.readFileSync("./templates/page.html", "utf-8");

const entries = [];

// Clear existing HTML files.
fs.readdirSync(".")
  .filter((fn) => fn.endsWith(".html"))
  .forEach((fn) => fs.unlinkSync(`./${fn}`));

// Convert markdown files to HTML.
fs.readdirSync("./markdown").forEach((fn) => {
  const markdown = fs.readFileSync(`./markdown/${fn}`);
  const { data, content } = matter(markdown);
  const body = md.render(content);
  const slug = fn.replace(".md", "");

  fs.writeFileSync(
    `${slug}.html`,
    template.replace(/KEY_TITLE/g, data.title).replace("KEY_BODY", body)
  );

  // Save entry data to entry array.
  entries.push({ title: data.title, slug });
});

// Add HTML list of generated pages to index.html.
template = fs.readFileSync("./templates/index.html", "utf-8");

const listEl = entries
  .map((entry) => `<li><a href="./${entry.slug}.html">${entry.title}</a></li>`)
  .join("\n");

fs.writeFileSync("index.html", template.replace("KEY_ENTRIES", listEl));
