export const getMdxContent = async (slug) => {
  try {
    const module = await import(`../content/${slug}.mdx`);
    if (!module || !module.default) {
      throw new Error(`No content found for slug: ${slug}`);
    }
    return module.default;
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      throw new Error(`Content not found: ${slug}`);
    }
    console.error(`Error loading MDX content for slug ${slug}:`, error);
    throw error;
  }
};

export const getAllContentPaths = () => {
  try {
    const contentPaths = import.meta.glob("../content/*.mdx", { eager: true });
    return Object.keys(contentPaths).map((path) => {
      const slug = path.match(/\.\.\/content\/(.*?)\.mdx/)[1];
      return { params: { slug } };
    });
  } catch (error) {
    console.error("Error getting content paths:", error);
    return [];
  }
};
