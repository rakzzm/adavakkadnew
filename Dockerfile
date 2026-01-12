FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy all HTML files to nginx html directory
COPY *.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY products.js /usr/share/nginx/html/
COPY gallery.js /usr/share/nginx/html/
COPY chatbot.js /usr/share/nginx/html/
COPY chatbot.css /usr/share/nginx/html/
COPY favicon.png /usr/share/nginx/html/

# Copy logo and brands folders
COPY logo/ /usr/share/nginx/html/logo/
COPY brands/ /usr/share/nginx/html/brands/

# Copy video folder
COPY VIdeo/ /usr/share/nginx/html/VIdeo/

# Copy Homepage folder with collection images
COPY Homepage/ /usr/share/nginx/html/Homepage/

# Copy gallery folder with gallery images
COPY Gallery/ /usr/share/nginx/html/gallery/

# Copy products folder with product images
COPY Products/ /usr/share/nginx/html/Products/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
