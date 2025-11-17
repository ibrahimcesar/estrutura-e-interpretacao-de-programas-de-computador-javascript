# DNS Configuration Guide for scipjs.com

## Current Issue
GitHub Pages is reporting: "Both scipjs.com and its alternate name are improperly configured - Domain's DNS record could not be retrieved."

## Solution: Configure Route 53 DNS Records

To make your custom domain work with GitHub Pages, you need to configure the following DNS records in AWS Route 53:

### Step 1: Configure A Records for Apex Domain (scipjs.com)

In Route 53, create **4 A records** for the apex domain `scipjs.com` pointing to GitHub's IP addresses:

1. Go to Route 53 Console
2. Select your hosted zone for `scipjs.com`
3. Click "Create record"
4. Configure as follows:
   - **Record name**: Leave blank (for apex domain)
   - **Record type**: A - Routes traffic to an IPv4 address
   - **Value**: Enter all 4 IP addresses (one per line):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **TTL**: 300 seconds (or default)
   - **Routing policy**: Simple routing
5. Click "Create records"

### Step 2: (Optional) Configure WWW Subdomain

If you want `www.scipjs.com` to also work, create a CNAME record:

1. Click "Create record"
2. Configure as follows:
   - **Record name**: `www`
   - **Record type**: CNAME - Routes traffic to another domain name
   - **Value**: `ibrahimcesar.github.io`
   - **TTL**: 300 seconds (or default)
3. Click "Create records"

### Step 3: Verify DNS Configuration

After configuring the DNS records, you can verify them using these commands:

```bash
# Check A records for apex domain
dig scipjs.com +short

# Check CNAME for www subdomain (if configured)
dig www.scipjs.com +short

# Alternative: use nslookup
nslookup scipjs.com
nslookup www.scipjs.com
```

You should see the GitHub Pages IP addresses in the response.

### Step 4: Wait for DNS Propagation

DNS changes can take anywhere from a few minutes to 48 hours to propagate globally, though it usually happens within 15-30 minutes.

### Step 5: Verify in GitHub

1. Go to your GitHub repository settings
2. Navigate to Pages section
3. Under "Custom domain", verify that `scipjs.com` is configured
4. Wait for GitHub to verify the DNS configuration
5. Once verified, you'll see a checkmark and the option to "Enforce HTTPS"

## Current Configuration

Your repository is configured with:
- **Domain**: scipjs.com
- **Base URL**: /pt_BR/
- **Full site URL**: https://scipjs.com/pt_BR/
- **GitHub Pages branch**: gh-pages

## Troubleshooting

### DNS Check Not Passing
- Ensure all 4 A records are configured correctly
- Check for any conflicting DNS records (remove old A/CNAME records for scipjs.com)
- Wait at least 15-30 minutes after making changes

### SSL Certificate Issues
- GitHub automatically provisions SSL certificates, but this requires DNS to be working first
- After DNS is verified, wait a few minutes for the SSL certificate to be issued
- Make sure "Enforce HTTPS" is checked in GitHub Pages settings

### Site Not Loading at scipjs.com/pt_BR/
- Verify that the gh-pages branch has been deployed successfully
- Check GitHub Actions for any deployment errors
- Ensure the CNAME file in the static folder contains `scipjs.com`

## Additional Notes

- The CNAME file should contain only the domain name: `scipjs.com` (already configured correctly)
- GitHub Pages will automatically handle the /pt_BR/ subdirectory based on your Docusaurus baseUrl configuration
- After DNS is working, it may take a few minutes for the SSL certificate to be issued

## References

- [GitHub Pages Custom Domain Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [AWS Route 53 Documentation](https://docs.aws.amazon.com/route53/)
