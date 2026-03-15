import type { APIRoute } from 'astro';
import { execSync } from 'child_process';

export const GET: APIRoute = async ({ request }) => {
  const secret = import.meta.env.VERSION_SECRET;
  if (secret && request.headers.get('x-version-secret') !== secret) {
    return new Response(null, { status: 401 });
  }

  let info = { shortHash: 'n/a', hash: 'n/a', message: 'n/a', branch: 'n/a', date: 'n/a', behind: -1 };
  try {
    info.shortHash = execSync('git rev-parse --short HEAD', { cwd: process.cwd() }).toString().trim();
    info.hash      = execSync('git rev-parse HEAD',         { cwd: process.cwd() }).toString().trim();
    info.message   = execSync('git log -1 --pretty=%s',     { cwd: process.cwd() }).toString().trim();
    info.branch    = execSync('git rev-parse --abbrev-ref HEAD', { cwd: process.cwd() }).toString().trim();
    info.date      = execSync('git log -1 --pretty=%ci',    { cwd: process.cwd() }).toString().trim();
    try {
      execSync('git fetch --quiet', { cwd: process.cwd(), timeout: 8000 });
      info.behind = parseInt(execSync('git rev-list HEAD..@{u} --count', { cwd: process.cwd() }).toString().trim(), 10) || 0;
    } catch {}
  } catch {}

  return new Response(JSON.stringify(info), {
    headers: { 'Content-Type': 'application/json' },
  });
};
