import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

// import GitHub from "@auth/core/providers/github";
// import Google from "@auth/core/providers/google";

export const CustomPassword = Password({
  profile(params) {
    return {
      email: params.email as string,
    };
  },
});

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword],
});
