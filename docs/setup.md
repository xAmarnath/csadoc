---
title: Setting Up Your Development Environment on Windows
---

# Setting Up Your Development Environment on Windows 🚀

This guide will walk you through installing Node.js and Visual Studio Code (VS Code) on Windows. Don't worry if you're new to this - we'll break it down into simple steps!

## Installing Node.js 📦

### What is Node.js?

Node.js is a platform that lets you run JavaScript on your computer (instead of just in a web browser). We need it to:

- Run JavaScript applications
- Use npm (Node Package Manager) to install useful tools and libraries
- Run development servers for our projects

### Installation Steps

1. **Download Node.js**

   - Visit [Node.js official website](https://nodejs.org)
   - Click the "LTS" (Long Term Support) version - this is the most stable version!
   - The website will automatically detect that you're using Windows

2. **Run the Installer**

   - Double-click the downloaded file (it will be named something like `node-v16.x.x-x64.msi`)
   - Click "Next" to start the installation
   - Accept the license agreement
   - Keep clicking "Next" using the default options
   - Click "Install" when ready

3. **Verify Installation**
   - Open Command Prompt (you can search for "cmd" in the Start menu)
   - Type these commands:
     ```bash
     node --version
     npm --version
     ```
   - If you see version numbers, congratulations! Node.js is installed! 🎉

::: tip Having Trouble?
If you get an error like "node is not recognized", try:

1. Close and reopen Command Prompt
2. If that doesn't work, restart your computer
   :::

## Installing Visual Studio Code 👨‍💻

### What is VS Code?

Visual Studio Code (VS Code) is a super powerful text editor that makes coding much easier with features like:

- Syntax highlighting (makes your code colorful and easier to read)
- Code completion (suggests code as you type)
- Built-in terminal
- Lots of helpful extensions

### Installation Steps

1. **Download VS Code**

   - Visit [VS Code website](https://code.visualstudio.com)
   - Click the big blue "Download for Windows" button
   - The download will start automatically

2. **Run the Installer**

   - Double-click the downloaded file (named something like `VSCodeUserSetup-x64-1.xx.x.exe`)
   - Accept the license agreement
   - Important! On the "Select Additional Tasks" screen:
     - ✅ Check "Add 'Open with Code'" options
     - ✅ Check "Register Code as an editor"
     - ✅ Check "Add to PATH"
   - Click "Install"

3. **Recommended Extensions**
   After installing VS Code, let's add some helpful extensions:

   1. Click the Extensions icon in the left sidebar (looks like four squares)
   2. Search for and install these extensions:
      - "JavaScript (ES6) code snippets"
      - "Prettier - Code formatter"
      - "Auto Rename Tag"
      - "Path Intellisense"

### First Time Setup

When you first open VS Code:

1. Click "File" → "Auto Save" to enable automatic saving
2. Press `Ctrl + ,` to open Settings
3. Search for "format on save" and check the box
4. Search for "terminal integrated shell windows" and select "Command Prompt" or "PowerShell"

## Testing Your Setup 🧪

Let's make sure everything works!

1. **Create a Test Project**

   - Create a new folder on your computer called "test-project"
   - Open VS Code
   - Go to File → Open Folder and select your "test-project" folder
   - Click "Yes, I trust the authors" if prompted

2. **Create a Test File**

   - Click the "New File" icon in VS Code
   - Name it `test.js`
   - Add this code:
     ```javascript
     console.log('Hello, World!');
     ```

3. **Run the Test**
   - Open the terminal in VS Code (View → Terminal or `` Ctrl + ` ``)
   - Type `node test.js`
   - You should see "Hello, World!" printed in the terminal

::: tip Success! 🎉
If you see "Hello, World!" in the terminal, your setup is complete and working perfectly!
:::

## Troubleshooting Common Issues 🔧

### Node.js Issues

1. **"node is not recognized"**

   - Reinstall Node.js and make sure to check "Add to PATH" during installation
   - Restart your computer after installation

2. **Permission errors**
   - Right-click Command Prompt and choose "Run as administrator"
   - Try the command again

### VS Code Issues

1. **Can't see file extensions**

   - In VS Code: View → Explorer
   - Click the three dots (...)
   - Check "Show File Extensions"

2. **Terminal not working**
   - Try changing the default terminal (Settings → Terminal → Integrated → Default Profile)
   - Restart VS Code

## Next Steps 🎯

Now that your development environment is set up, you can:

1. Start learning JavaScript
2. Create your first Node.js project
3. Explore VS Code's features
4. Try building a simple web application

Remember: Every developer started exactly where you are now. Take your time, and don't be afraid to make mistakes - that's how we learn!

Happy coding! 💻✨
