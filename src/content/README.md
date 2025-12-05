# Content Directory

This directory stores content that powers the AI chat assistant. The assistant is trained on this content to answer questions about Liam's work, experience, and approach.

## Structure

```
content/
├── case-studies/       # Detailed project writeups
│   ├── hard-rock.md
│   ├── hp.md
│   └── ...
├── sandbox/            # Sandbox exploration descriptions
│   └── exploration-1.md
├── linkedin-posts/     # LinkedIn post archives
│   └── ...
├── blog/              # Optional blog content
│   └── ...
└── context.md         # Additional context about Liam
```

## Adding Content

### Case Studies
Create a markdown file in `case-studies/` with:

```markdown
---
title: Project Name
description: Short description
role: Your Role
---

# Overview
...

# The Problem
...

# Approach
...

# Solution
...

# Results
...
```

### LinkedIn Posts
Add posts as individual markdown files or a single file with posts separated by `---`.

### Additional Context
The `context.md` file contains general information about Liam that helps the AI answer broader questions.

## How It's Used

The chat API reads these files to provide context to Claude when answering questions. The content is:
1. Loaded at runtime
2. Formatted into a context prompt
3. Sent with user questions to Claude

For production, consider:
- Vector embeddings via Supabase/Pinecone for semantic search
- Chunking large documents
- Caching frequently accessed content
















