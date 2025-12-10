/**
 * Lifecycle callbacks for the `scooter-color` content type.
 * Auto-generates slug from name if code is empty.
 */

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    
    // Auto-generate code from name if not provided
    if (data.name && !data.code) {
      data.code = slugify(data.name);
    }
  },

  async beforeUpdate(event: any) {
    const { data } = event.params;
    
    // Auto-generate code from name if code is empty and name is being updated
    if (data.name && !data.code) {
      data.code = slugify(data.name);
    }
  },
};

