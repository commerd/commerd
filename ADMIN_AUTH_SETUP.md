# Admin Authentication Setup Guide

This guide will help you set up Supabase authentication for the Commerd admin interface.

## Prerequisites

1. A Supabase account and project
2. Admin user credentials

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from the project settings

## Step 2: Set Up Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the values with your actual Supabase project details.

## Step 3: Create Admin User

### Option A: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add user" and create an admin user
4. Set a strong password and note the email

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Create admin user
supabase auth users create --email admin@commerd.com --password your-secure-password
```

## Step 4: Configure Authentication Settings

In your Supabase dashboard:

1. Go to Authentication > Settings
2. Configure the following:
   - **Site URL**: `https://admin.commerd.com` (or your admin subdomain)
   - **Redirect URLs**: Add `https://admin.commerd.com/admin` and `https://admin.commerd.com/admin/login`
   - **JWT expiry**: Set to a reasonable value (e.g., 3600 seconds)

## Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/admin` (or your admin subdomain)
3. You should be redirected to the login page
4. Log in with your admin credentials
5. You should be redirected to the admin dashboard

## Step 6: Deploy to Production

1. Add the environment variables to your Vercel project:
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Update your Supabase authentication settings:
   - Change Site URL to your production admin subdomain
   - Update redirect URLs to production URLs

## Security Features

The admin authentication system includes:

- **Session Management**: Automatic session refresh and persistence
- **Route Protection**: All admin routes require authentication
- **Secure Logout**: Proper session cleanup
- **User Menu**: Easy access to user info and logout
- **Loading States**: Smooth authentication flow
- **Error Handling**: Clear error messages for failed logins

## Troubleshooting

### Common Issues

1. **"Invalid login credentials"**
   - Check that the user exists in Supabase
   - Verify the email and password are correct
   - Ensure the user is confirmed (not pending)

2. **Redirect loops**
   - Check your Supabase Site URL configuration
   - Verify redirect URLs are properly set
   - Ensure environment variables are correct

3. **"Supabase URL not found"**
   - Verify your `NEXT_PUBLIC_SUPABASE_URL` environment variable
   - Check that the URL is accessible
   - Ensure the project is active in Supabase

### Debug Mode

To enable debug logging, add this to your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## Advanced Configuration

### Custom User Roles

To implement role-based access control:

1. Create a `profiles` table in Supabase:
   ```sql
   create table profiles (
     id uuid references auth.users on delete cascade,
     email text,
     role text default 'user',
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     primary key (id)
   );
   ```

2. Set up Row Level Security (RLS):
   ```sql
   alter table profiles enable row level security;
   
   create policy "Users can view own profile" on profiles
     for select using (auth.uid() = id);
   ```

3. Update the AuthContext to check user roles

### Session Management

The system automatically handles:
- Session refresh
- Token expiration
- Secure logout
- Cross-tab synchronization

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify your Supabase project settings
3. Ensure environment variables are properly set
4. Check the Supabase logs in your dashboard

For additional help, refer to the [Supabase Auth documentation](https://supabase.com/docs/guides/auth).
