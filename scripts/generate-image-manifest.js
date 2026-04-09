const fs = require("fs");
const path = require("path");

const manifest = {};

const projects = [
  {
    slug: "stripping-benidorm",
    sections: ["dia", "noche"],
  },
  {
    slug: "cuba",
    sections: ["root"],
  },
  {
    slug: "el-corte-ingles",
    sections: ["root"],
  },
  {
    slug: "tenerife",
    sections: ["root"],
  },
  {
    slug: "mosi",
    sections: ["root"],
  },
];

const imageExts = [
  ".jpg",
  ".jpeg",
  ".JPG",
  ".JPEG",
  ".png",
  ".PNG",
  ".webp",
  ".WEBP",
];

projects.forEach(({ slug, sections }) => {
  manifest[slug] = {};
  sections.forEach((section) => {
    const folder =
      section === "root"
        ? path.join("public", "images", slug)
        : path.join("public", "images", slug, section);

    if (!fs.existsSync(folder)) {
      manifest[slug][section] = [];
      return;
    }

    const files = fs
      .readdirSync(folder)
      .filter((f) => imageExts.includes(path.extname(f)))
      .map((f) =>
        section === "root" ? `/images/${slug}/${f}` : `/images/${slug}/${section}/${f}`
      )
      .sort();

    manifest[slug][section] = files;
  });
});

const libDir = "lib";
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir);
}

fs.writeFileSync(
  path.join("lib", "image-manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log("✓ Image manifest generated");
console.log(JSON.stringify(manifest, null, 2));
