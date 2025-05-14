# Mini E-Commerce Platform

A simple React-based mini e-commerce frontend for submitting and searching products. This app interacts with a backend API for product management.

## Features

- **Product Submission**: Add new products with name, price, description, and optional image URL.
- **Product Listing**: View all submitted products in a grid layout.
- **Search Functionality**: Search for products by name or description.
- **Tab Interface**: Switch between submission form and product listing.
- **Real-time Feedback**: Displays loading states and success/error notifications.

## Technologies Used

- React (with Hooks)
- Tailwind CSS for styling
- Lucide React Icons
- Backend API hosted on Render

## API Endpoints

The frontend communicates with the following backend endpoints:

- `GET /api/products` - Fetch all products
- `POST /api/products` - Submit a new product
- `POST /api/products/search` - Search for products

API Base URL:

```
https://mini-ecom-backend.onrender.com/api/products
```

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mini-ecommerce-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## File Structure

- `App.jsx`: Main application logic and UI
- `index.css`: Global styles with Tailwind CSS

## Environment Variables

No custom environment variables are required. The API URL is hardcoded but can be extracted into an `.env` file if needed for production.

## Notes

- Make sure the backend API (`https://mini-ecom-backend.onrender.com`) is up and running.
- If product images fail to load, a fallback mechanism can be added.
- Basic input validation is implemented; consider adding more robust validation in production.

## Future Improvements

- Add pagination to product listing
- Implement product editing and deletion
- Improve mobile responsiveness
- Add image upload functionality instead of just image URL

## License

This project is open-source and available under the [MIT License](LICENSE).
# mini-ecom-frontend
