

import type { OAuthProviderButtonStyles, OAuthConfig } from "next-auth/providers/index";

type FeideProviderOptions = {
  clientId: string;
  clientSecret: string;
  style?: OAuthProviderButtonStyles
}

type FeideOAuthProfile = {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

export function FeideProvider(options: FeideProviderOptions): OAuthConfig<FeideOAuthProfile> {
  const style = options.style ?? {
    logo: "https://raw.githubusercontent.com/TheVoxcraft/feide-provider-next-auth/1.0.0/icons/blaa_feide.svg",
    logoDark: "https://raw.githubusercontent.com/TheVoxcraft/feide-provider-next-auth/1.0.0/icons/hvit_feide.svg",
    bg: "#fff",
    text: "#1F4698",
    bgDark: "#1F4698",
    textDark: "#fff",
  };
  return {
    id: "feide",
    name: "Feide",
    type: "oauth",
    wellKnown: "https://auth.dataporten.no/.well-known/openid-configuration",
    authorization: {
      url: "https://auth.dataporten.no/oauth/authorization",
      params: { scope: "email openid userid profile groups" }
    },
    checks: ["pkce", "state"],
    profile(profile) {
      if (!profile.sub || !profile.name || !profile.email || !profile.picture) {
        console.error("Invalid profile, but continuing:", profile);
      }
      return {
        id: String(profile.sub),
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }
    },
    style: style,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
  };
};