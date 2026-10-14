@echo off
rem NOTE: this file must stay ASCII-only. cmd.exe reads a .cmd file byte by
rem byte, so non-ASCII text gets mangled (see start.cmd for the details).
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 18+ is required. Install it from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

node "%~dp0serve-page.mjs"
if errorlevel 1 pause
