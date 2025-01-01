# URL Shortener

A simple URL shortener service that allows users to create shortened URLs for long links, redirect users to the original URL, and track the total number of clicks for each shortened URL.

## Features

- Generate a shortened URL for a given valid URL.
- Redirect users from the shortened URL to the original URL.
- Track and display the total number of visits/clicks for each shortened URL.

## API Endpoints

### 1. `POST /URL`
- **Description**: Generates a new shortened URL.
- **Request**:
  ```json
  {
    "original_url": "https://example.com/some-long-url"
  }
