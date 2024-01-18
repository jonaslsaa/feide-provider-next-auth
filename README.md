# FEIDE Provider for NextAuth (now Auth.js)

Customizable Feide Provider for NextAuth for support for custom scopes and claims.

## Installation

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

## Feide callback

`https://[YOUR_DOMAIN]/api/auth/callback/feide`

## Base feide scopes

- openid
- userid
