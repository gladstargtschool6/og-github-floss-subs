# Next.js Subscription Payments Starter

The all-in-one starter kit for high-performance SaaS applications. With a few clicks, Next.js developers can clone, deploy and fully customize their own SaaS subscription application.

## Features

- Secure user management and authentication with [Supabase](https://supabase.io/docs/guides/auth).
- Powerful data access & management tooling on top of PostgreSQL with [Supabase](https://supabase.io/docs/guides/database).
- Integration with [Stripe Checkout](https://stripe.com/docs/payments/checkout) and the [Stripe customer portal](https://stripe.com/docs/billing/subscriptions/customer-portal), all plumbing already set up.
- Automatic syncing of pricing plans, and subscription statuses via [Stripe webhooks](https://stripe.com/docs/webhooks).

## Demo

- https://nextjs-subscription-payments-starter.vercel.app/

[![Screenshot of demo](./public/demo.png)](https://nextjs-subscription-payments-starter.vercel.app/)

## Architecture

![Architecture diagram](./public/architecture_diagram.svg)

## Setup

### 1. Create new Supabase project

Sign up to Supabase - [https://app.supabase.io](https://app.supabase.io)  
Select 'new project'  
Choose organization - If this is your first time using Supabase, you'll have to select and set up 'New organization'  
Determine 'Name' and 'Password' select 'Next'  
Wait for your database to setup and start  

### 2. Set up your database tables and auth policies

In your Supabase dashboard, go to the SQL editor  
Navigate to 'Quick Start' section  
Select 'Stripe Subscriptions' (this has the same content as the [`schema.sql` file](./schema.sql))  
- This will set up another tab ('Query 2' next to 'Query 1')  
Inside of this tab, mid to lower right on screen, select 'RUN' button  
- When 'RUN' has completed, you should see the message 'Success. No rows returned' in 'Results' area  
- You can check your 'Table Editor' tab and click on the table icon to make sure that your tables have been created (Or check same by navigating to 'Database' tab and selecting 'Tables')  


#### [Optional] - Set up OAuth providers

You can use third-party login providers like GitHub or Google. Refer to the [docs](https://supabase.io/docs/guides/auth#third-party-logins) to learn how to configure these.

##### GitHub example: 
Go to Github Developer page [here](https://github.com/settings/applications/new)  
Choose your 'Application Name'  
Set 'Homepage URL' to 'https://nextjs-subscription-payments-starter.vercel.app/'  
Set 'Authorization callback URL' to 'https://<your-project>.supabase.co/auth/v1/callback'  
- <your-project> can be found by going to: Supabase -> 'Settings' tab -> API  
- It is specifically only the letters between 'https://' and '.supabase.co' (for example: https://lnydivosxgnokkjgrmwv.supabase.co --- 'lnydivosxgnokkjgrmwv' would be all you need  
  
Select 'Register application'  
You will be redirected to application page  
  
Back in Supabase go to 'Authentication' tab -> 'Settings' -> 'EXTERNAL OAUTH PROVIDERS'
Toggle 'GITHUB EMABLED' to active  
Copy and paste from the GitHub application page the 'Client ID' back to Supabase 
On GitHub page select 'Generate a new client secret'
Copy and paste this 'Client secrets' back to Supabase
Select 'Save'  
  
Same Tab -> 'GENERAL' section  
Change 'SITE URL' from 'https://localhost/3000' to the name of your new Vercel app's live site
- Check that you are now able to use the GitHub OAuth LogIn
- Github OAuth will automatically supply the logged in account with Name & Email

### 3. Get your Supabase credentials

In your [Supabase Dashboard](https://app.supabase.io/)  
Go to the 'Project Settings' (the cog icon) -> API tab  
Find your API URL, the public `anon` key, and the secret `service_role` key  
You will be prompted for these when deploying with Vercel

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fthorwebdev%2Fnextjs-subscription-payments&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY&envDescription=Add%20your%20API%20keys%20from%20the%20Supabase%20Dashboard&project-name=nextjs-subscription-payments&repo-name=nextjs-subscription-payments&demo-title=Next.js%20Subscription%20Payments%20Starter%20Demo&demo-url=https%3A%2F%2Fnextjs-subscription-payments-starter.vercel.app%2F&demo-image=https%3A%2F%2Fnextjs-subscription-payments-starter.vercel.app%2Fdemo.png&integration-ids=oac_pb1dqJT8Ry2D99Q0o9qXWIhJ)  
You might be asked at this point to log-in -> follow your Vercel login steps  
Re-name your project in 'PROJECT NAME' section
Select 'Continue'  
'Install Integrations' window appears - Select 'Install'  
When modal pops up, choose 'Connect to Stripe' - Sign In or Sign Up to Stripe as necessary  
On the next page, you can choose to work in 'Development Mode' and choose 'Skip this account form' on top of page  
  
  
#### Once your project has been deployed, continue with the configuration steps below. Note that this deployment step includes prompts for automatically creating a webhook endpoint for you.  
  

Automatically set up the webhooks by selecting 'Set up webhooks'  
- To make sure these webhooks have been set up properly, in a seperate tab navigate to 'Manage in Stripe Dashboard →'  Make sure the 'Developers' -> 'Webhooks' -> 'Description' reads "Created by Vercel deploy integration."  

On original modal, Select 'Back to Vercel' and installation will complete  
On Vercel page, click 'Continue'  
Change 'REPOSITORY NAME' and click 'Continue'  
On the 'Import Project' page we will transfer the Supabase secrets and keys here  


### Configure Supabase Auth

Supabase -> 'Settings' tab -> API  
Copy the deployment 'URL'  
Navigate back to Vercel and set this as the value for 'NEXT_PUBLIC_SUPABASE_URL'  
  
Supabase -> 'Settings' tab -> API  
Copy the 'API KEYS' anon public <value>    
Navigate back to Vercel and set this as the value for 'NEXT_PUBLIC_SUPABASE_ANON_...'  

Supabase -> 'Settings' tab -> API  
Copy the 'API KEYS' service_role <value>  
Navigate back to Vercel and set this as the value for 'SUPABASE_SERVICE_ROLE_KEY'  
  
Select 'Deploy'


## Configure Stripe  
  
[Stripe Dashboard](https://dashboard.stripe.com)  

### Create Product and Pricing Information

For Stripe to automatically bill your users for recurring payments, you need to create your product and pricing information in the [Stripe Products Tab](https://dashboard.stripe.com/test/products). When you create or update your product and price information, the changes are automatically synced with your Supabase database, as long as the webhook is configured correctly (the webhook creation is part of deploying to Vercel, the webhook endpoint is configured at the `/api/webhooks` path).  

Stripe Checkout currently supports pricing plans that bill a predefined amount at a specific interval. More complex plans (e.g. different pricing tiers or seats) are not yet supported.  

For example, you can create business models with different pricing tiers, e.g.:  
- IMPORTANT: At this time please make sure to set up BOTH monthly and yearly plans for each product added.

- Product 1: Hobby
  - Price 1: 10 USD per month
  - Price 2: 100 USD per year
  - Price 3: 8 GBP per month
  - Price 4: 80 GBP per year
  - [...]: additional currency and interval combinations
- Product 2: Freelancer
  - Price 1: 20 USD per month
  - Price 2: 20 USD per year
  - Price 3: 16 GBP per month
  - Price 4: 160 GBP per year
  - [...]: additional currency and interval combinations

### Configure the Stripe customer portal

1. Set your custom branding in the [settings](https://dashboard.stripe.com/settings/branding).
1. Configure the Customer Portal [settings](https://dashboard.stripe.com/test/settings/billing/portal).
1. Toggle on "Allow customers to update their payment methods".
1. Toggle on "Allow customers to update subscriptions".
1. Toggle on "Allow customers to cancel subscriptions".
1. Add the products and prices that you want to allow customer to switch between.
1. Set up the required business information and links.

### That's it

That's it, you're now ready to earn recurring revenue from your customers \o/

## Develop locally

If you've deployed the project with Vercel, it will have created a repository for you which you can clone to your local machine:  
- Clone the repository in GitHub  
- In your local machines' terminal, command: git clone <paste your cloned repo here>  
- cd into your app  
- Command: the cloned repo will be on the (master) branch, to change it to (main) command: git branch -M main  
- Command: git add . 
- Command: git commit -m "<your message here>" 
- Command: git push  
- In github, navigate to your repo -> Settings -> Branches  
- In 'Default' section, from dropdown, select 'main', then choose 'update', 'I understand ...'  
Must now change the branch directly in Vercel, also:  
- Navigate directly to app's dashboard on Vercel  
- 'Settings' -> 'Git' -> 'Production Branch'  
- From the dropdown, select 'main', then 'Save'


If you haven't deployed with Vercel, you can use [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) or [npx](https://github.com/zkat/npx#readme) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/thorwebdev/nextjs-subscription-payments my-saas-app
# or
yarn create next-app --example https://github.com/thorwebdev/nextjs-subscription-payments my-saas-app
```

### Setting up the env vars locally

Create a copy of `.env.local.example`:

```bash
cp .env.local.example .env.local
```

In your [Supabase Dashboard](https://app.supabase.io/), go to the Project Settings (the cog icon), open the API tab, and find your API URL, the public `anon` key, and the secret `service_role` key and set them in your newly created `.env.local` file.

In your [Stripe Dashboard](https://dashboard.stripe.com/apikeys), go to Developers > API keys, and copy the publishable key and the secret key to your `.env.local` file.

The webhook secret differs for local testing vs. when deployed to Vercel. Follow the instructions below to get the corresponding webhook secret.

### Install dependencies and run the Next.js client

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

### Use the Stripe CLI to test webhooks

First [install the CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#login-account).

Next, start the webhook forwarding:

```bash
stripe listen --forward-to=localhost:3000/api/webhooks
```

The CLI will print a webhook secret (such as, `whsec_***`) to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file.
