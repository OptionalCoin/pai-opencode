#!/usr/bin/env bun
import { existsSync, unlinkSync, symlinkSync, mkdirSync, lstatSync, readlinkSync, rmSync } from 'fs';
import { join, basename } from 'path';
import { homedir } from 'os';

const BRAIN_DIR = join(homedir(), '.pai-brain');
const CWD = process.cwd();
const OPENCODE_DIR = join(CWD, '.opencode');

// Core config files to symlink
const CORE_LINKS = [
  { source: join(BRAIN_DIR, 'opencode.json'), target: join(CWD, 'opencode.json'), desc: 'Main config' },
  { source: join(BRAIN_DIR, 'settings.json'), target: join(OPENCODE_DIR, 'settings.json'), desc: 'PAI settings' },
];

// User data folders to symlink (only if they exist in ~/.pai-brain)
const USER_DATA_FOLDERS = [
  { source: join(BRAIN_DIR, 'USER'), target: join(OPENCODE_DIR, 'USER'), desc: 'User data' },
  { source: join(BRAIN_DIR, 'MEMORY'), target: join(OPENCODE_DIR, 'MEMORY'), desc: 'PAI memory' },
  { source: join(BRAIN_DIR, 'skills/PAI/USER/SOFTWAREREFERENCE'), target: join(OPENCODE_DIR, 'skills/PAI/USER/SOFTWAREREFERENCE'), desc: 'Software reference' },
];

// Parse arguments
const args = Bun.argv.slice(2);
const dryRun = args.includes('--dry-run') || args.includes('-n');
const force = args.includes('--force') || args.includes('-f');
const verbose = args.includes('--verbose') || args.includes('-v');
const help = args.includes('--help') || args.includes('-h');

function log(msg: string, color: 'blue' | 'green' | 'yellow' | 'red' | 'gray' = 'gray') {
  const colors: Record<string, string> = {
    blue: '\x1b[34m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    gray: '\x1b[90m',
  };
  console.log(`${colors[color]}${msg}\x1b[0m`);
}

function logVerbose(msg: string) {
  if (verbose) log(msg, 'gray');
}

if (help) {
  console.log(`
\x1b[1mPAI-OpenCode Global Linker\x1b[0m

Usage: bun Tools/link-project.ts [options]

Options:
  --dry-run, -n    Show what would be done without making changes
  --force, -f      Overwrite existing symlinks without prompting
  --verbose, -v     Show detailed output
  --help, -h        Show this help message

Source of Truth: ${BRAIN_DIR}
`);
  process.exit(0);
}

log('PAI-OpenCode Global Linker', 'blue');
log(`Source of Truth: ${BRAIN_DIR}\n`, 'gray');

// Verify brain directory exists
if (!existsSync(BRAIN_DIR)) {
  log(`PAI Brain directory not found: ${BRAIN_DIR}`, 'red');
  log('Please ensure ~/.pai-brain exists with your config files.', 'yellow');
  process.exit(1);
}

// Ensure .opencode directory exists
if (!existsSync(OPENCODE_DIR)) {
  log('.opencode directory not found. Creating...', 'yellow');
  if (!dryRun) mkdirSync(OPENCODE_DIR, { recursive: true });
}

// Ensure skills/PAI directory exists
const paiSkillDir = join(OPENCODE_DIR, 'skills/PAI');
if (!existsSync(paiSkillDir)) {
  log('skills/PAI directory not found. Creating...', 'yellow');
  if (!dryRun) mkdirSync(paiSkillDir, { recursive: true });
}

interface Link {
  source: string;
  target: string;
  desc: string;
}

const allLinks: Link[] = [...CORE_LINKS, ...USER_DATA_FOLDERS];

let successCount = 0;
let skipCount = 0;
let failCount = 0;
let createdCount = 0;

for (const link of allLinks) {
  const displayPath = link.target.replace(CWD, '.');
  
  try {
    // Check if source exists
    if (!existsSync(link.source)) {
      // Only warn for core files, skip silently for folders that might not exist
      if (link.source.includes('opencode.json') || link.source.includes('settings.json')) {
        log(`Source missing: ${link.source}`, 'red');
        log(`Make sure ${basename(link.source)} exists in ~/.pai-brain/`, 'gray');
        failCount++;
      } else {
        logVerbose(`Skipping: ${link.desc} (${basename(link.source)} not in ~/.pai-brain)`);
        skipCount++;
      }
      continue;
    }

    // Check if target already exists
    if (existsSync(link.target)) {
      const isSymlink = lstatSync(link.target).isSymbolicLink();
      
      if (isSymlink) {
        const currentSource = readlinkSync(link.target);
        if (currentSource === link.source) {
          log(`Already linked: ${displayPath}`, 'green');
          successCount++;
          continue;
        } else if (!force) {
          log(`Different symlink: ${displayPath}`, 'yellow');
          log(`Current: ${currentSource}`, 'gray');
          log('Use --force to replace', 'gray');
          skipCount++;
          continue;
        }
      }

      log(`Removing existing: ${displayPath}`, 'gray');
      if (!dryRun) {
        try {
          unlinkSync(link.target);
        } catch {
          // Try removing as directory
          rmSync(link.target, { recursive: true, force: true });
        }
      }
    }

    if (dryRun) {
      log(`[DRY-RUN] Would link: ${displayPath} -> ${link.source}`, 'blue');
    } else {
      symlinkSync(link.source, link.target);
      log(`Linked: ${displayPath}`, 'green');
      createdCount++;
    }
    successCount++;
  } catch (err: any) {
    log(`Failed: ${displayPath}`, 'red');
    log(`Error: ${err.message}`, 'gray');
    failCount++;
  }
}

console.log('');
console.log('='.repeat(50));
log('Project synced to PAI Brain!', 'blue');
if (successCount > 0) log(`Linked: ${successCount}`, 'green');
if (createdCount > 0) log(`Created: ${createdCount}`, 'green');
if (skipCount > 0) log(`Skipped: ${skipCount}`, 'yellow');
if (failCount > 0) log(`Failed: ${failCount}`, 'red');
console.log('='.repeat(50));

if (failCount > 0) {
  process.exit(1);
}
