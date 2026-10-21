// Payload CMS Interactive Developer Playground

const snippets = {
  local: {
    request: `// Local API in Next.js Server Component\nconst posts = await payload.find({\n  collection: 'posts',\n  where: {\n    published: { equals: true }\n  },\n  limit: 10,\n  sort: '-createdAt'\n});`,
    response: `{\n  "docs": [\n    {\n      "id": "64f9b8c2e10a",\n      "title": "Scaling Next.js with Payload CMS",\n      "slug": "scaling-nextjs",\n      "author": { "name": "Toxa", "role": "admin" },\n      "createdAt": "2026-10-21T18:00:00.000Z"\n    }\n  ],\n  "totalDocs": 1,\n  "limit": 10,\n  "totalPages": 1\n}`
  },
  rest: {
    request: `// HTTP GET REST API\ncurl -X GET "https://api.myapp.com/api/posts?where[published][equals]=true&limit=10" \\\n  -H "Authorization: Bearer <API_KEY>" \\\n  -H "Content-Type: application/json"`,
    response: `HTTP/1.1 200 OK\nContent-Type: application/json\nX-Response-Time: 1.8ms\n\n{\n  "docs": [\n    {\n      "id": "64f9b8c2e10a",\n      "title": "Scaling Next.js with Payload CMS",\n      "slug": "scaling-nextjs",\n      "author": "64f9b88e1001",\n      "status": "published"\n    }\n  ],\n  "hasNextPage": false\n}`
  },
  graphql: {
    request: `// Auto-Generated GraphQL Query\nquery GetPublishedPosts {\n  Posts(where: { published: { equals: true } }, limit: 10) {\n    docs {\n      id\n      title\n      slug\n      createdAt\n    }\n    totalDocs\n  }\n}`,
    response: `{\n  "data": {\n    "Posts": {\n      "docs": [\n        {\n          "id": "64f9b8c2e10a",\n          "title": "Scaling Next.js with Payload CMS",\n          "slug": "scaling-nextjs",\n          "createdAt": "2026-10-21T18:00:00.000Z"\n        }\n      ],\n      "totalDocs": 1\n    }\n  }\n}`
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Star button simulation
  let stars = 28412;
  const starPill = document.getElementById('starPill');
  const starCountEl = document.getElementById('starCount');
  let hasStarred = false;

  if (starPill) {
    starPill.addEventListener('click', () => {
      if (!hasStarred) {
        stars++;
        hasStarred = true;
        starCountEl.textContent = '28.5k';
        starPill.style.borderColor = '#22c55e';
      } else {
        stars--;
        hasStarred = false;
        starCountEl.textContent = '28.4k';
        starPill.style.borderColor = '';
      }
    });
  }

  // API Playground Tabs
  const apiTabs = document.querySelectorAll('#apiTabs .api-tab');
  const requestPre = document.getElementById('requestCodeSnippet');
  const responsePre = document.getElementById('responseCodeSnippet');

  apiTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      apiTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.getAttribute('data-api');
      const data = snippets[mode];
      if (data && requestPre && responsePre) {
        requestPre.textContent = data.request;
        responsePre.textContent = data.response;
      }
    });
  });

  // Copy Snippet
  const copyBtn = document.getElementById('copyCodeBtn');
  if (copyBtn && requestPre) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(requestPre.textContent).then(() => {
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyBtn.textContent = '📋 Copy'; }, 2000);
      });
    });
  }

  // Copy CLI Command
  const copyCliBtn = document.getElementById('copyCliBtn');
  const cliText = document.getElementById('cliCommandText');
  const notice = document.getElementById('cliCopiedNotice');

  if (copyCliBtn && cliText) {
    copyCliBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cliText.textContent).then(() => {
        if (notice) notice.style.display = 'block';
        setTimeout(() => { if (notice) notice.style.display = 'none'; }, 2500);
      });
    });
  }
});
