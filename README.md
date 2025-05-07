# Users may re-order categories
A simple javascript to allow users on your Jcink.com forum (or similar IPB 1.3 situations) to re-order categories.

## Features
- **Drag-and-Drop Reordering**: Reorder forum categories by dragging their titles.
- **Persistent Storage**: Saves the custom order in `localStorage` for persistence across sessions.
- **Cross-Tab Syncing**: Updates the category order in real-time across open tabs via the `storage` event.
- **Graceful Merging**: Handles new or removed categories by merging them with the existing order.
- **Smooth Transitions**: Supports view transitions (where available) for a polished drag-and-drop experience.
- **Customizable Styling**: Includes CSS for visual feedback during drag operations, such as highlighting drop zones.

## Installation
1. Add the styling from mod.css anywhere in your HTML
2. Add the script from mod.js anywhere in your HTML, but ensure it runs after the HTML is loaded (use defer, or add near </body>

## Note
This script works with Jcink's default theme and many custom themes. However, some themes may alter the HTML structure, breaking the script. If you encounter issues, try contacting me or create a topic on https://jcodesresources.com for potential customization.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
