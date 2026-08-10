import { cookies } from "next/headers";
import { verifyToken } from "../jwt";
import { prisma } from "../prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const jwtData = await verifyToken(token);

    if (!jwtData) {
      return null;
    }

    return jwtData;
  } catch {
    return null;
  }
}


export async function getCurrentUserData() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
}