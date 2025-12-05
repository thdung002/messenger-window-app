# Messenger App

A modern desktop messenger application built with Electron, React, and TypeScript. This app provides real-time messaging capabilities with a beautiful, responsive user interface.

## 🎯 Ready-to-Use Windows Executable

**Your messenger app is ready!** The following Windows 10 64-bit executables have been generated in the `release/` folder:

- **`MessengerApp-1.0.0-portable.exe`** (88MB) - Portable version, no installation required
- **`Messenger App Setup 1.0.0.exe`** (97MB) - Full installer with desktop shortcuts

### Quick Start for End Users:
1. Navigate to the `release/` folder
2. Double-click `MessengerApp-1.0.0-portable.exe` to run immediately
3. Or run the installer for a permanent installation

## Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Real-time Messaging**: Instant message delivery and receipt
- **Cross-platform**: Runs on Windows, macOS, and Linux
- **TypeScript**: Full type safety and better development experience
- **Styled Components**: Modern CSS-in-JS styling
- **Electron**: Native desktop app capabilities

## Technologies Used

- **Electron** - Desktop app framework
- **React** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Styled Components** - CSS-in-JS styling
- **Webpack** - Module bundling
- **Socket.io** - Real-time communication (planned)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or extract the project files
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm start
```

This will:
1. Start the React development server on `http://localhost:3000`
2. Launch the Electron app automatically
3. Enable hot reloading for both React and Electron

### Building

To build the application for production:

```bash
npm run build
```

To create distributable packages:

```bash
npm run dist
```

## Project Structure

```
messenger-app/
├── electron/           # Electron main and preload scripts
│   ├── main.ts        # Main Electron process
│   └── preload.ts     # Preload script for security
├── src/               # React application source
│   ├── components/    # React components
│   │   ├── ChatWindow.tsx
│   │   ├── LoginForm.tsx
│   │   └── Sidebar.tsx
│   ├── App.tsx        # Main React component
│   └── index.tsx      # React entry point
├── public/            # Static assets
│   └── index.html     # HTML template
├── dist/              # Built files
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript config for React
├── tsconfig.electron.json # TypeScript config for Electron
└── webpack.config.js  # Webpack configuration
```

## Available Scripts

- `npm start` - Start development server with hot reloading
- `npm run start:react` - Start React development server only
- `npm run start:electron` - Start Electron app only
- `npm run build` - Build both React and Electron for production
- `npm run build:react` - Build React app for production
- `npm run build:electron` - Build Electron main process
- `npm run pack` - Package the app for current platform
- `npm run dist` - Create distributable packages

## Usage

1. **Login**: Enter your name to start using the messenger
2. **Chat Selection**: Click on any conversation in the sidebar to start chatting
3. **Messaging**: Type your message and press Enter or click the send button
4. **Real-time Updates**: Messages appear instantly in the chat window

## Future Enhancements

- [ ] Socket.io integration for real-time communication
- [ ] User authentication system
- [ ] File sharing capabilities
- [ ] Group chat management
- [ ] Message encryption
- [ ] Desktop notifications
- [ ] System tray integration
- [ ] Message search functionality
- [ ] Emoji support
- [ ] Theme customization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
