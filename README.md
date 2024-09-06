App Setup

1.-  ```cp .env.example .env```

2.- ```npm i```

3.- ```npx prisma generate```

4.- ```npm run dev```

You'll have to setup a Supabase account & Stripe account, then add all of the details in to your .env file.

Once you've connected your application to Supabase. You'll also need to setup the Auth Providers: Google Google Github Github

```
https://supabase.com/docs/guides/auth/social-login/auth-google
https://supabase.com/docs/guides/auth/social-login/auth-github
```

Now run the command to migrate your database tables and run your seed file.


5.- ```npx prisma migrate dev --name init```


