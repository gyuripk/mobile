# Citrus Scribbles App

## Purpose

Citrus Scribbles is a user-friendly mobile application designed for creating, managing, and organizing notes with a refreshing citrus-themed interface. It offers a simple yet effective way to keep track of your thoughts, tasks, and important information. The app is built using React Native and Expo, ensuring a smooth and responsive user experience across both iOS and Android platforms.

## Features

- User Authentication: Register and login securely.
- Note Management: Create, edit, delete, and view notes.
- Search Functionality: Search notes by title or content.
- Dark Mode: Switch between light and dark themes.
- Large Text Mode: Toggle larger text for better readability.

## Dependencies

- React Native
- Expo
- React Navigation
- AsyncStorage
- FontAwesome5 Icons
- date-fns

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rbfl6418/mobile.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mobile
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Application Architecture

- **Components**: Reusable UI elements.
- **Screens**: Different screens of the app (Login, Signup, NoteList, Note).
- **Navigation**: React Navigation for handling screen transitions.
- **Context**: Global state management using Context API for theme settings.
- **Styles**: Separate style files for global styles and component-specific styles.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## Reporting Issues

Please report issues using the GitHub issue tracker. Provide a clear description of the issue and steps to reproduce it.

## License

This project is licensed under the MIT License.
