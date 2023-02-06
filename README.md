# Nginx with GitHub Authentication

A wrapped around NGINX to integrate with GitHub Authentication and block access
to users who are not part of a given GitHub organization.

For an example usage, see [`./example-app`](./example-app).

Based on https://www.nginx.com/blog/validating-oauth-2-0-access-tokens-nginx/
and https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps

## Installation

### Create a GitHub OAuth App

In order to enable authorization though GitHub and usage of GitHub APIs, a
GitHub OAuth application needs to be created.

This can be done for a GitHub organization or user profile:

1. Open organization / user settings on GitHub
2. On the sidebar, select "Developer Settings"
3. Select "OAuth Apps"
4. Press "New OAuth App"
5. Fill out the required information
6. Set authentication callback URL to this URL:

   ```
   https://localhost/
   ```

   When in production, replace `localhost` with the actual hostname

7. Press "Generate a new client secret"
8. Client ID and Client Secret is displayed on the OAUth app configuration page.
9. Write them down somewhere temporary as they would be needed later

### Usage

For an example usage, see [`./example-app`](./example-app).

Create an `auth.conf` file:

```nginx
# Client ID of the created GitHub App
set $oauth_client_id "todo";

# Client Secret of the created GitHub App
set $oauth_client_secret "todo";

# Name of the GitHub organization whose members can access the app
set $github_organization "specify";

# Scopes to request from GitHub
set $github_scopes "read:org";
```

Then use that file in your `docker-compose.yml`. Example configuration:

```yaml
  nginx:
    # Rather than using nginx:alphine, use this image:
    image: specifyconsortium/nginx-with-github-auth
    ports:
      - '80:80'
      - '443:443'
    volumes:
      # This configures the authorization
      - './sp7-stats/config/auth.conf:/etc/nginx/auth.conf'
      # The rest can be provided as needed:
      - './sp7-stats/config/nginx.conf:/etc/nginx/conf.d/default.conf'
      - './sp7-stats/:/var/www/:ro'
      - './sp7-stats/config/fullchain.pem:/etc/letsencrypt/live/sp7-stats/fullchain.pem:ro'
      - './sp7-stats/config/privkey.pem:/etc/letsencrypt/live/sp7-stats/privkey.pem:ro'
```
