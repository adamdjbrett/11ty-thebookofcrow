const parentKey = "/index/";

export default {
  eleventyComputed: {
    eleventyNavigation: (data) => {
      const slug = data.slug || data.page?.fileSlug;
      if (!slug) {
        return data.eleventyNavigation;
      }

      return {
        key: slug,
        title: data.navLabel || data.heading || data.title,
        parent: parentKey,
        url: `/#${slug}`,
        order: data.order ?? Number.MAX_SAFE_INTEGER
      };
    }
  }
};
