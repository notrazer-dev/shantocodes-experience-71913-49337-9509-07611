# 🌍 Final Configuration for Supabase URLs

You need to tell Supabase about **both** your local computer and your website.

## Step 1: Go to Supabase URL Configuration
1. Go to [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **Authentication** -> **URL Configuration**.

## Step 2: Set Site URL
Set **Site URL** to your main website:
```
https://shantojoseph.com
```

## Step 3: Add Redirect URLs (Crucial!)
You must add **ALL** of these to the **Redirect URLs** list. Click "Add URL" for each one:

1. `http://localhost:8080`
2. `http://localhost:8080/**`  <-- The ** allows any page on localhost
3. `https://shantojoseph.com`
4. `https://shantojoseph.com/**` <-- The ** allows any page on your site

## Step 4: Verify Google Cloud
Ensure Google Cloud still has the **Supabase Callback URL** (from Auth -> Providers -> Google).
It should look like: `https://zdvqqzuvcfeufvqqsubo.supabase.co/auth/v1/callback`
https://zdvqqzuvcfeufvqqsubo.supabase.co/auth/v1/callback

## Step 5: Save & Test
1. Click **Save** in Supabase.
2. Wait 1 minute.
3. Try logging in again from localhost.
