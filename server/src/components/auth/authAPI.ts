export interface GoogleProviderDTO {
  providerName: 'google';
  googleId: string;
  displayName: string;
  picture: string;
}

interface GithubProviderDTO {
  providerName: 'github';
  githubId: string;
}

export type ProviderDTO = GoogleProviderDTO | GithubProviderDTO;

// Passport provides its own type definition
// export interface PassportGoogleDTO {
//   id: string;
//   displayName: string;
//   name: {
//     familyName: string;
//     givenName: string;
//   };
//   emails: { value: string; verified: boolean }[];
//   photos: { value: string }[];
//   provider: string;
//
//   _raw: {
//     sub: string;
//     name: string;
//     given_name: string;
//     family_name: string;
//     picture: string;
//     email: string;
//     email_verified: boolean;
//     locale: string;
//   };
//   _json: {
//     sub: string;
//     name: string;
//     given_name: string;
//     family_name: string;
//     picture: string;
//     email: string;
//     email_verified: boolean;
//     locale: string;
//   };
// }
