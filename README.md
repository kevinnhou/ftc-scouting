# FTC Scouting

Scouting Application for the 2024/2025 First Tech Challenge - Into The Deep

## Features

- **Form UI**: Responsive form for data input
- **Data Export**: Saved submissions can be exported via QR Codes and Google Sheets API
- **Offline Functionality**: Downloadable as a PWA (Progressive Web App), for remote/offline competitions

- **Data Analysis**: Saved submissions can be analysed using built in analytics. Measures al

## Tech Stack

1.  _[Next.js](https://nextjs.org/docs)_: React framework
2.  _[Tailwind CSS](https://tailwindcss.com/docs)_: CSS framework
3.  _[shadcn/ui](https://ui.shadcn.com/)_: Component Library
4.  _[Google Sheets](https://sheets.google.com/)_: Database

## Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/lemonade64/ftc-scouting.git

    ```

2.  Install dependencies:

    ```bash
    bun install

    ```

3.  Add the environment variables (optional):

    - Create a `.env.local` file in the root directory of the project.
    - Add your environment variables for the Google Sheets API

      ```bash
      GOOGLE_PRIVATE_KEY=
      GOOGLE_CLIENT_ID=
      GOOGLE_CLIENT_EMAIL=

      ```

4.  Start the development server:

    ```bash
    bun run dev

    ```

5.  Access the form at [http://localhost:3000](http://localhost:3000/)

## Usage

1.  **Data Input**: Start by entering relevant data for each metric, including robot performance, team behavior, and match outcomes. Be sure to complete all fields to ensure a comprehensive scouting report.
2.  **Form Submission**: Once all the data has been entered and verified for accuracy, click the submit button. Your form will be saved and you can either export the data via QR code or sync it with the connected Google Sheets database for analysis.
3.  **QR Code Export**: After submission, a unique QR code will be generated for easy access to the scouting data. Scan the QR code to view or share the data.
4.  **Google Sheets Integration**: All submitted data will be automatically saved to the configured Google Sheet, which can be accessed for further processing or analysis.

## License

This project is licensed under the MIT License. Feel free to use, modify and distribute as needed.

Happy Scouting!

[FRC Scouting App](https://github.com/kevinnhou/frc-scouting)
