import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (token !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login");
  }
}

export function checkAdminToken(token: string | undefined): boolean {
  return token === process.env.ADMIN_PASSWORD;
}
