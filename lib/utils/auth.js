import jwt from "jsonwebtoken";
import { parse } from "cookie";

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function setAuthCookie(res, token) {
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export function removeAuthCookie(res) {
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
}

export function getAuthToken(req) {
  // Check Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  // Check cookies
  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) {
    const cookies = parse(cookieHeader);
    return cookies.token;
  }

  return null;
}

export async function verifyAuth(req) {
  const token = getAuthToken(req);

  if (!token) {
    return { authenticated: false, error: "No token provided" };
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return { authenticated: false, error: "Invalid token" };
  }

  return { authenticated: true, userId: decoded.id };
}
