@echo off
rem NOTE: this file must stay ASCII-only.
rem cmd.exe reads a .cmd file byte by byte, so multi-byte UTF-8 text gets
rem split mid-character and ends up as garbage (or as a bogus command).
rem A UTF-8 BOM is not an option either: it corrupts the first token.
rem Hence the English messages below.

cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies, the first run may take a minute...
  npm install
)
npm run dev
