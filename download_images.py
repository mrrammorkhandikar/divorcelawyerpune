#!/usr/bin/env python3
"""
Script to download images from the lawyer's website gallery
"""

import requests
import os
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import time

def download_image(url, folder, filename):
    """Download an image from URL to the specified folder"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        filepath = os.path.join(folder, filename)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

def get_gallery_images(base_url):
    """Get image URLs from the gallery page"""
    try:
        response = requests.get(base_url, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Look for common image patterns
        images = []
        
        # Find all img tags
        img_tags = soup.find_all('img')
        for img in img_tags:
            src = img.get('src')
            if src:
                full_url = urljoin(base_url, src)
                if any(ext in full_url.lower() for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp']):
                    images.append(full_url)
        
        # Also look for background images in CSS
        style_tags = soup.find_all('style')
        for style in style_tags:
            # Simple regex-like search for background images
            content = style.string or ''
            if 'background-image' in content:
                # Extract URLs from background-image properties
                import re
                urls = re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', content)
                for url in urls:
                    full_url = urljoin(base_url, url)
                    if any(ext in full_url.lower() for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp']):
                        images.append(full_url)
        
        return list(set(images))  # Remove duplicates
        
    except Exception as e:
        print(f"Failed to fetch gallery page: {e}")
        return []

def main():
    gallery_url = "http://www.divorcelawyerpune.in/gallery/"
    assets_folder = "assets"
    
    # Create assets folder if it doesn't exist
    if not os.path.exists(assets_folder):
        os.makedirs(assets_folder)
    
    print(f"Fetching images from: {gallery_url}")
    
    # Get image URLs
    image_urls = get_gallery_images(gallery_url)
    
    if not image_urls:
        print("No images found. Creating placeholder images...")
        # Create some placeholder images with legal themes
        placeholder_images = [
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&h=600&fit=crop"
        ]
        image_urls = placeholder_images
    
    print(f"Found {len(image_urls)} images")
    
    # Download images
    downloaded_count = 0
    for i, url in enumerate(image_urls):
        # Extract filename from URL
        parsed_url = urlparse(url)
        filename = os.path.basename(parsed_url.path)
        
        # If no filename or invalid, create one
        if not filename or '.' not in filename:
            filename = f"gallery-image-{i+1}.jpg"
        
        # Ensure unique filename
        base_name, ext = os.path.splitext(filename)
        counter = 1
        while os.path.exists(os.path.join(assets_folder, filename)):
            filename = f"{base_name}-{counter}{ext}"
            counter += 1
        
        if download_image(url, assets_folder, filename):
            downloaded_count += 1
        
        # Be respectful with requests
        time.sleep(0.5)
    
    print(f"\nDownloaded {downloaded_count} images to {assets_folder}/")
    print("You can now use these images in your website!")

if __name__ == "__main__":
    main()
