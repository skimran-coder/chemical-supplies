# Chemical Supplies Management System

## Overview

The **Chemical Supplies Management System** is a web-based application designed to help manage the inventory of chemicals, vendors, and packaging. It provides an intuitive interface for users to add, edit, sort, and remove chemical supplies, with features like dark mode, CSV downloads, and inline editing. The application is built using pure HTML, CSS, and JavaScript with a focus on minimal dependencies and optimized client-side functionality.

## Features

- **CRUD Operations**: The system allows users to **Create**, **Read**, **Update**, and **Delete** chemical supplies directly from the table interface.
- **Inline Editing**: Users can double-click table cells to quickly edit values, with changes saved automatically.
- **Sorting Functionality**: Clickable table headers enable users to sort data in ascending or descending order. Sorting applies to both numbers and strings.
- **Dark Mode**: A toggle button allows users to switch between light and dark themes, with their preference saved to local storage.
- **Download as CSV**: Users can download the current data set as a CSV file, providing an easy way to export and back up their inventory.
- **Data Persistence**: All changes made by users are saved locally using `localStorage`, ensuring data persists across page reloads and browser sessions.
- **Responsive Design**: The application is designed to be responsive and functional across different devices and screen sizes.

## Project Structure

### HTML/CSS/JS Breakdown

- **HTML**: Defines the structure and layout of the page, including the table, buttons, and icons.
- **CSS**: Manages the styling of the page, with special focus on responsive design, dark mode, and button interactions.
- **JavaScript**: Handles all dynamic functionality such as CRUD operations, sorting, downloading files, and theme toggling. Here's a breakdown of the main scripts:
  - **renderTable.js**: Handles the dynamic rendering of table rows from the chemicals data.
  - **sortColumn.js**: Implements column sorting functionality, allowing toggling between ascending and descending order.
  - **helpers.js**: Contains utility functions for localStorage handling, theme management, and checkbox selections.
  - **downloadFile.js**: Enables the data download feature as a CSV file.
  - **addTableRow.js**: Allows users to dynamically add new chemical entries.
  - **deleteRow.js**: Implements the functionality to delete selected table rows.
  - **moveRowUp.js & moveRowDown.js**: Functions that allow users to move selected rows up or down within the table.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/skimran-coder/chemical-supplies.git
   cd chemical-supplies
   ```

2. Open the `index.html` file in a web browser to view and interact with the app.

3. No external dependencies or server setup is required. The project runs entirely on the client side.

## Vision and Future Plans

### Current Vision

The current goal of the project is to offer a simple yet efficient solution for small laboratories, schools, and research centers to manage their chemical inventory without the need for a server-based or cloud application. The use of client-side technologies like `localStorage` makes it lightweight and portable, perfect for environments with minimal infrastructure.

### Future Enhancements

1. **Server Integration**: In the future, I plan to move towards a more scalable solution by integrating a backend (likely using Node.js and MongoDB) for persistent storage, allowing multiple users to access and manage the inventory.
  
2. **Authentication**: Implement user authentication and authorization, so that only authorized personnel can make changes to the inventory.
  
3. **Bulk Data Upload**: Enable the option to bulk upload chemical data using CSV or Excel files, making it easier to import large inventories.

4. **Enhanced Reporting**: Provide detailed reports on stock levels, vendors, and packaging, with downloadable graphs and statistics.

5. **Mobile App Version**: Develop a mobile app using React Native to allow users to manage the inventory from their phones.

6. **Collaborative Editing**: Future versions could include real-time collaborative editing capabilities, where multiple users can manage the inventory simultaneously.

7. **Search and Filter**: Add advanced search and filter options, allowing users to quickly find specific chemicals or vendors.

8. **Notifications**: Implement notifications for low stock alerts, expired chemicals, or upcoming deliveries.

9. **Unit Testing**: Integrate unit tests for JavaScript functions to improve code reliability and maintainability.

## Contributions

I welcome contributions! If you have any suggestions, bug fixes, or new feature requests, feel free to open a pull request or raise an issue.