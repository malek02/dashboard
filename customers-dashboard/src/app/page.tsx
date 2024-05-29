import { redirect } from "next/navigation";

export default async function Page() {
  let redirectURL = `/dashboard`;

  redirect(redirectURL);
}
