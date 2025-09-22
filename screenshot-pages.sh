#!/bin/bash

# Screenshot script for portfolio pages
BASE_URL="https://thomgriggs-portfolio.vercel.app"
PAGES=("/" "/projects" "/about" "/contact" "/notes" "/archive")

echo "Taking screenshots of portfolio pages..."
echo "Make sure your browser is open to the site first!"

for page in "${PAGES[@]}"; do
    # Clean page name for filename
    filename=$(echo "$page" | sed 's/\///g' | sed 's/^$/home/')
    
    echo "Opening $BASE_URL$page"
    open "$BASE_URL$page"
    
    echo "Waiting 3 seconds for page to load..."
    sleep 3
    
    echo "Taking screenshot: ${filename}.png"
    screencapture -w "screenshots/${filename}.png"
    
    echo "Screenshot saved: screenshots/${filename}.png"
    echo "---"
done

echo "All screenshots complete!"


