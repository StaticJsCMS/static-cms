export const workflowStatus = { draft: 'Drafts', review: 'In Review', ready: 'Ready' };
export const editorStatus = { draft: 'Draft', review: 'In review', ready: 'Ready' };
export const setting1 = { limit: 10, author: 'John Doe' };
export const setting2 = { name: 'Jane Doe', description: 'description' };
export const publishTypes = {
  publishNow: 'Publish now',
  publishAndCreateNew: 'Publish and create new',
  publishAndDuplicate: 'Publish and duplicate',
};

export const notifications = {
  saved: 'Entry saved',
  published: 'Entry published',
  unpublished: 'Entry unpublished',
  updated: 'Entry status updated',
  deletedUnpublished: 'Unpublished changes deleted',
  error: {
    missingField: "Oops, you've missed a required field. Please complete before saving.",
  },
  validation: {
    range: {
      fieldLabel: 'Number of posts on frontpage',
      message: 'Number of posts on frontpage must be between 1 and 10.',
    },
  },
};
export const HOT_KEY_MAP = {
  bold: 'mod+b',
  code: 'mod+shift+c',
  italic: 'mod+i',
  strikethrough: 'mod+shift+s',
  'heading-one': 'mod+1',
  'heading-two': 'mod+2',
  'heading-three': 'mod+3',
  'heading-four': 'mod+4',
  'heading-five': 'mod+5',
  'heading-six': 'mod+6',
  link: 'mod+k',
};
