import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/blog",  // Ensure this matches your content path
        fields: [
          {
            type: "string",       //Title
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },

          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,  // Optional, make it required if needed
          },
          
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
            required: true,  // Optional, depending on your needs
            ui: {
              // Optional: Customize the image aspect ratio or preview size in the editor
              imagePreview: true,
            },
          },

          {
            type: "datetime",   //Time
            name: "publishDate",
            label: "Publish Date",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "HH:mm",
            },
          },

          {
            type: "string",     //Post Status
            name: "status",
            label: "Status",
            options: [
              { value: "live", label: "Live" },
              { value: "down", label: "Down" },
            ],
            required: true,
          },
          
          

          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
