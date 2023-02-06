ARG NGINX_VERSION=alpine
FROM nginx:${NGINX_VERSION} AS nginx-with-github-auth

# Enable NJS
RUN apk add --no-cache nginx-module-njs
RUN echo "load_module modules/ngx_http_js_module.so;" \
       | cat - /etc/nginx/nginx.conf > temp \
    && mv temp /etc/nginx/nginx.conf

# Copy nginx config files
COPY nginx-with-github-auth /etc/nginx/nginx-with-github-auth
