// scripts/reset-project.js

const { execSync } = require("child_process");
const fs = require("fs");

console.log("🔁 Resetting project...");

try {
  console.log("🧹 Removing node_modules...");
  execSync("rm -rf node_modules", { stdio: "inherit" });
} catch (e) {
  // For Windows fallback
  execSync("rmdir /s /q node_modules", { stdio: "inherit", shell: "cmd.exe" });
}

console.log("🧼 Removing package-lock.json...");
fs.rmSync("package-lock.json", { force: true });

console.log("📦 Installing packages...");
execSync("npm install", { stdio: "inherit" });

console.log("✅ Project reset complete.");
