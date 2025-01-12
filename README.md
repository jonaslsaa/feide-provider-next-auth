# Feide Provider for NextAuth (now Auth.js)

Customizable [Feide](https://www.feide.no/) Provider for NextAuth for support for custom scopes and claims.

## Installation

Install the provider from [npm](https://www.npmjs.com/package/feide-provider-next-auth).

```bash
npm install feide-provider-next-auth
```

## Example usage

```ts
import { FeideProvider } from 'feide-provider-next-auth';

const FeideExtraScopes = ['email']
type ExtraClaims = { email: string; }; // Custom claims based on scope 'email'

export const authOptions: NextAuthOptions = {
  ...
  providers: [
    FeideProvider<ExtraClaims>({
      clientId: env.FEIDE_CLIENT_ID,
      clientSecret: env.FEIDE_CLIENT_SECRET,
      scopes: FeideExtraScopes,
      profileHandler: (profile) => { return { id: profile.sub, email: profile.email }; }
    }),
  ],
  ...
};
```

## NextAuth Callback URL for Feide

`https://[YOUR_DOMAIN]/api/auth/callback/feide`

## Base feide scopes

[OpenID Configuration](https://auth.dataporten.no/.well-known/openid-configuration)

- openid
- userid
