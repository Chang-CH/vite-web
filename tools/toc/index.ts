import { readSync } from 'to-vfile';
import { matter } from 'vfile-matter';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

type frontmatterData = {
  [key: string]: string | frontmatterData;
};

export function parseFrontmatter(filePath: string): frontmatterData {
  const file = readSync(filePath);
  matter(file);
  return file.data.matter as any;
}

export function stringify(obj_from_json: { [key: string]: any }): string {
  if (typeof obj_from_json !== 'object' || Array.isArray(obj_from_json)) {
    // not an object, stringify using native function
    return JSON.stringify(obj_from_json);
  }
  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  const props = Object.keys(obj_from_json)
    .map(key => `${key}:${stringify(obj_from_json[key])}`)
    .join(',');
  return `{${props.replace(/"/g, "'")}}`;
}

// Helper function to convert camel case to title case
function camelCaseToTitleCase(camelCase: string) {
  return camelCase
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^\w/, c => c.toUpperCase());
}

// Helper function to get git timestamps
function getGitTimestamps(filePath: string) {
  const createdAt = execSync(
    `git log --diff-filter=A --format=%at -- ${filePath}`
  )
    .toString()
    .trim();
  const modifiedAt = execSync(`git log -1 --format=%at -- ${filePath}`)
    .toString()
    .trim();
  return {
    createdAt: parseInt(createdAt, 10),
    modifiedAt: parseInt(modifiedAt, 10),
  };
}

// Function to process files and directories
function processDirectory(directoryPath: string, root: string, outDir: string) {
  const files = fs.readdirSync(directoryPath, { withFileTypes: true });
  const pages: Array<any> = [];

  for (const file of files) {
    const filePath = path.join(directoryPath, file.name);
    const ext = path.extname(file.name);
    let title = '';
    let isMdx = false;
    let isFolder = false;
    const route = path.relative(root, filePath).replace(/\\/g, '/'); // Handle cross-platform paths

    if (file.isDirectory()) {
      isFolder = true;
      let indexFilePath = '';
      if (fs.existsSync(path.join(filePath, 'index.mdx'))) {
        indexFilePath = path.join(filePath, 'index.mdx');
        isMdx = true;
      } else if (fs.existsSync(path.join(filePath, 'index.md'))) {
        indexFilePath = path.join(filePath, 'index.md');
      }

      if (indexFilePath) {
        const frontmatter = parseFrontmatter(indexFilePath);
        title =
          typeof frontmatter.title === 'string'
            ? frontmatter.title
            : camelCaseToTitleCase(path.basename(filePath));
        const { createdAt, modifiedAt } = getGitTimestamps(indexFilePath);

        pages.push({
          title,
          id: pages.length,
          isMdx,
          isFolder,
          createdAt,
          modifiedAt,
          ...frontmatter,
          route: path.relative(root, indexFilePath).replace(/\\/g, '/'),
        });
      }

      // Recursively process the folder and create pages.json inside it
      generatePagesTs(filePath, outDir + '/' + route);
    } else if (ext === '.mdx' || ext === '.md') {
      const frontmatter = ext === '.mdx' ? parseFrontmatter(filePath) : {};
      title =
        typeof frontmatter.title === 'string'
          ? frontmatter.title
          : camelCaseToTitleCase(path.basename(filePath).slice(0, -ext.length));
      isMdx = ext === '.mdx';
      const { createdAt, modifiedAt } = getGitTimestamps(filePath);

      pages.push({
        title,
        id: pages.length,
        isMdx,
        isFolder,
        createdAt,
        modifiedAt,
        route,
        ...frontmatter,
      });
    }
  }

  return {
    directoryTitle: camelCaseToTitleCase(path.basename(directoryPath)),
    directoryDescription: '',
    pages,
  };
}

// Main function to generate pages.json
export function generatePagesJson(root: string, outDir = 'dist') {
  const distDir = path.join(outDir);
  fs.mkdirSync(distDir, { recursive: true });

  const rootPages = processDirectory(root, root, outDir);
  //   fs.writeFileSync(
  //     path.join(distDir, "pages.json"),
  //     JSON.stringify(rootPages, null, 2)
  //   );
  // console.log(rootPages);
  console.log('JSON CALLED: WRITTEN ' + rootPages.directoryTitle);
}

export function generatePagesTs(root: string, outDir = 'dist') {
  const distDir = path.join(outDir);
  fs.mkdirSync(distDir, { recursive: true });

  const rootPages = processDirectory(root, root, outDir);
  const outFile = path.join(distDir, 'pages.ts');
  fs.writeFileSync(
    outFile,
    `const pages = ${stringify(rootPages)};export default pages;`
  );
  console.log(`[${root}][${outDir}]WRITTEN @ ${outFile}`);
}
