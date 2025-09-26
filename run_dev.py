#!/usr/bin/env python3
"""
Development server runner for Plant Seeds Cook website
"""

import os
import sys
from app import app, init_db

if __name__ == "__main__":
    # Initialize database
    init_db()

    # Get port from environment or default to 5000
    port = int(os.environ.get("PORT", 5000))

    # Run the Flask app
    app.run(host="0.0.0.0", port=port, debug=True)
