# Ramzan Toolkit

A premium digital resources collection with key-based authentication system.

## Features

- Key-based authentication system
- One key per mobile number restriction
- Contact owner via WhatsApp
- Organized resource categories
- Responsive design

## Setup

1. Clone this repository
2. Add your keys to `keys/keys.json`
3. Deploy to your hosting provider

## Key Format

The `keys.json` file should contain an array of objects with this structure:

```json
{
    "key": "YOUR_ACCESS_KEY",
    "used": false,
    "mobile": null
}
