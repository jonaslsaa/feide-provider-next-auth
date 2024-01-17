

import { Awaitable, User } from "next-auth/core/types";
import type { OAuthProviderButtonStyles, OAuthConfig } from "next-auth/providers/index";

type FeideProviderOptions = {
  clientId: string;
  clientSecret: string;
  style?: OAuthProviderButtonStyles
}

type FeideOAuthProfileRequired = {
  iss: string;
  jti: string;
  aud: string;
  sub: string;
  iat: number;
  exp: number;
  auth_time: number;
}

function createScopeQuery(scope: string[]) {
  return scope.join(" ");
}

/**
 * Feide Provider for NextAuth.js
 * 
 * @param options Required options for Feide Provider
 * @param profileHandle Optional function to creation of User from Feide Profile
 * @param scopes Custoom scopes for Feide Provider (default: ["openid", "userid"]), use `profileHandle` and `TScopeReturn` when using custom scopes
 * @param params Optional params for Feide Provider
 * @generic TScopeReturn Object with custom values returned from Feide Provider (when using custom scopes)
*/
export function FeideProvider<TScopeReturn extends Record<string, any> = {}>(
  options: FeideProviderOptions,
  profileHandle?: (profile: FeideOAuthProfileRequired | TScopeReturn) => Awaitable<User>,
  scopes?: string[],
  params?: Record<string, any>
): OAuthConfig<FeideOAuthProfileRequired | TScopeReturn> {
  
  const use_style = options.style ?? {
    logo: "https://raw.githubusercontent.com/TheVoxcraft/feide-provider-next-auth/1.0.0/icons/blaa_feide.svg",
    logoDark: "https://raw.githubusercontent.com/TheVoxcraft/feide-provider-next-auth/1.0.0/icons/hvit_feide.svg",
    bg: "#fff",
    text: "#1F4698",
    bgDark: "#1F4698",
    textDark: "#fff",
  };

  const use_scope = scopes ?? ["openid", "userid"];

  const default_profileHandle = (profile: FeideOAuthProfileRequired | TScopeReturn) => {
    return {
      id: String(profile.sub),
      name: null,
      email: null,
      image: null,
    };
  }

  const use_profileHandle = profileHandle ?? default_profileHandle;

  return {
    id: "feide",
    name: "Feide",
    type: "oauth",
    wellKnown: "https://auth.dataporten.no/.well-known/openid-configuration",
    authorization: {
      url: "https://auth.dataporten.no/oauth/authorization",
      params: {
        scope: createScopeQuery(use_scope),
        ...params,
      }
    },
    checks: ["pkce", "state"],
    profile(profile) {
      return use_profileHandle(profile);
    },
    style: use_style,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
  };
};