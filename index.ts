/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import type { OAuthProviderButtonStyles, Provider } from "next-auth/providers/index";

type FeideProviderOptions = {
  clientId: string;
  clientSecret: string;
  style?: OAuthProviderButtonStyles
}

export function FeideProvider(options: FeideProviderOptions): Provider {
  const style = options.style ?? {
    logo: "icons/blaa_feide.svg",
    logoDark: "icons/hvit_feide.svg",
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile(profile: any) {
      if (!profile.sub || !profile.name || !profile.email || !profile.picture) {
        console.error("Invalid profile, but continuing:", profile);
      }
      return {
        id: String(profile.sub!),
        name: profile.name!,
        email: profile.email!,
        image: profile.picture!,
      }
    },
    style: style,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
  };
};