import { IdAttributePlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import addFilters from "./_config/filters.js";

function sortByOrder(a, b) {
  const left = a.data?.order ?? Number.MAX_SAFE_INTEGER;
  const right = b.data?.order ?? Number.MAX_SAFE_INTEGER;
  return left - right;
}

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin, {
    navigationOptions: {
      listElement: "ul",
      listItemElement: "li",
      listClass: "toc",
      listItemClass: "",
      listItemHasChildrenClass: "",
      activeListItemClass: "",
      anchorClass: "",
      activeAnchorClass: "",
      activeKey: "",
      showExcerpt: false
    }
  });
  addFilters(eleventyConfig);

  eleventyConfig.addWatchTarget("./css/");

  eleventyConfig.addPassthroughCopy({ "css": "css" });
  eleventyConfig.addPassthroughCopy({ "public": "." });

  eleventyConfig.addCollection("homeSections", (collectionApi) =>
    collectionApi.getFilteredByGlob("./content/home/*.md").sort(sortByOrder)
  );

  eleventyConfig.addCollection("pages", (collectionApi) =>
    collectionApi.getFilteredByGlob("./content/pages/*.md").sort(sortByOrder)
  );

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      layouts: "../_includes/layouts",
      data: "../_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
}
