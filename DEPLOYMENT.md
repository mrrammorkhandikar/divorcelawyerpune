# Deployment Guide

This guide will help you deploy the Modern Lawyers Website to various hosting platforms.

## 🚀 Quick Start

### Local Development
1. Clone or download the project files
2. Open `index.html` in your browser, or
3. Run a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

## 🌐 Web Hosting Deployment

### 1. Traditional Web Hosting (cPanel, etc.)

1. **Upload Files**:
   - Upload all project files to your web hosting directory (usually `public_html` or `www`)
   - Maintain the folder structure: `assets/`, `styles/`, `js/`

2. **Update Configuration**:
   - Edit `index.html` to update contact information
   - Replace placeholder images in `assets/` folder
   - Update domain name in meta tags

3. **Set up Contact Form**:
   - Create a PHP file for form processing (see `README.md` for example)
   - Update form action in `index.html`

### 2. Netlify Deployment

1. **Connect Repository**:
   ```bash
   # Push to GitHub/GitLab
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Set build command: (leave empty for static site)
   - Set publish directory: `.` (root)
   - Deploy!

3. **Custom Domain**:
   - Add your custom domain in Netlify settings
   - Update DNS records as instructed

### 3. Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow prompts**:
   - Link to existing project or create new
   - Set project name
   - Deploy!

### 4. GitHub Pages

1. **Create Repository**:
   - Create a new repository on GitHub
   - Upload all project files

2. **Enable Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select source branch (usually `main`)
   - Save

3. **Access Site**:
   - Your site will be available at `https://username.github.io/repository-name`

## 📧 Contact Form Setup

### Option 1: Formspree (Recommended for beginners)

1. **Sign up** at [formspree.io](https://formspree.io)
2. **Create a form** and get your endpoint
3. **Update HTML**:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 2: Netlify Forms

1. **Add form attributes**:
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```

2. **Add hidden input**:
   ```html
   <input type="hidden" name="form-name" value="contact" />
   ```

### Option 3: Custom PHP Backend

1. **Create `process-form.php`**:
   ```php
   <?php
   if ($_POST) {
       $name = $_POST['name'];
       $email = $_POST['email'];
       $phone = $_POST['phone'];
       $service = $_POST['service'];
       $message = $_POST['message'];
       
       $to = "your-email@domain.com";
       $subject = "New Contact Form Submission";
       $body = "Name: $name\nEmail: $email\nPhone: $phone\nService: $service\nMessage: $message";
       
       mail($to, $subject, $body);
       
       header("Location: index.html?success=1");
   }
   ?>
   ```

2. **Update form action**:
   ```html
   <form action="process-form.php" method="POST">
   ```

## 🔧 Post-Deployment Checklist

### Essential Updates
- [ ] Replace all placeholder images with actual photos
- [ ] Update contact information (phone, email, address)
- [ ] Update business hours
- [ ] Test contact form functionality
- [ ] Update social media links
- [ ] Add Google Analytics (optional)

### SEO Optimization
- [ ] Update meta description and keywords
- [ ] Add Open Graph meta tags
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google My Business listing
- [ ] Add schema markup for local business

### Performance
- [ ] Optimize images (compress, resize)
- [ ] Enable GZIP compression
- [ ] Set up CDN (optional)
- [ ] Test page speed with Google PageSpeed Insights

### Security
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set up security headers
- [ ] Implement form validation
- [ ] Add reCAPTCHA to contact form (optional)

## 🎨 Customization After Deployment

### Update Content
1. **Edit `index.html`**:
   - Company name and tagline
   - Service descriptions
   - Team member information
   - Testimonials

2. **Update Images**:
   - Replace all files in `assets/` folder
   - Maintain same filenames or update HTML references

3. **Modify Colors**:
   - Edit CSS variables in `styles/main.css`
   - Update `:root` section for brand colors

### Add Features
1. **Blog Section**:
   - Create additional HTML pages
   - Add navigation links
   - Set up blog functionality

2. **Case Studies**:
   - Add new sections to showcase successful cases
   - Include before/after scenarios

3. **Online Booking**:
   - Integrate calendar booking system
   - Add appointment scheduling

## 🚨 Troubleshooting

### Common Issues

1. **Images Not Loading**:
   - Check file paths and names
   - Ensure images are uploaded to correct folder
   - Verify file permissions

2. **Contact Form Not Working**:
   - Check form action URL
   - Verify server supports PHP (if using PHP)
   - Test with Formspree or Netlify Forms

3. **Mobile Responsiveness Issues**:
   - Test on actual devices
   - Check viewport meta tag
   - Verify CSS media queries

4. **Slow Loading**:
   - Optimize image sizes
   - Enable compression
   - Use CDN for external resources

### Support Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Stack Overflow](https://stackoverflow.com/)
- [Web Hosting Support](https://support.google.com/webmasters/)

## 📞 Need Help?

If you encounter issues during deployment:
1. Check the browser console for errors
2. Verify all files are uploaded correctly
3. Test on different browsers and devices
4. Contact your hosting provider for server-specific issues

---

**Happy Deploying! 🎉**
