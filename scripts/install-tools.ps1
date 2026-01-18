#!/usr/bin/env pwsh
# Simplified installation script (ASCII only)

Write-Host "=== Project Environment Setup ===" -ForegroundColor Cyan

# 1. Check Node.js
if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js not installed" -ForegroundColor Red
    Write-Host "Please download from https://nodejs.org/" -ForegroundColor Yellow
    Write-Host 'Make sure to check "Add to PATH" during installation' -ForegroundColor Yellow
    Start-Process "https://nodejs.org/"
    exit
} else {
    $nodeVer = node --version
    Write-Host "OK: Node.js installed ($nodeVer)" -ForegroundColor Green
}

# 2. Check pnpm
if (-not (Get-Command "pnpm" -ErrorAction SilentlyContinue)) {
    Write-Host "Installing pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
    if (-not (Get-Command "pnpm" -ErrorAction SilentlyContinue)) {
        Write-Host "FAILED: Please run manually: npm install -g pnpm" -ForegroundColor Red
        exit
    }
}
$pnpmVer = pnpm --version
Write-Host "OK: pnpm installed (v$pnpmVer)" -ForegroundColor Green

# 3. Install project dependencies
Write-Host "Installing project dependencies..." -ForegroundColor Yellow
pnpm install

Write-Host ""
Write-Host "SUCCESS: Environment ready!" -ForegroundColor Green
Write-Host "Run: pnpm dev" -ForegroundColor Cyan
Write-Host "URL: http://localhost:3000" -ForegroundColor Cyan