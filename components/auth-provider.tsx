"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updatePassword,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { adminLogin } from "@/actions/admin";
import { clearServerSession, setServerSession } from "@/actions/auth";
import {
  ADMIN_AVATAR,
  ADMIN_DISPLAY_NAME,
  ADMIN_EMAIL,
  ADMIN_USER_ID,
} from "@/lib/admin-constants";
import { AUTH_COOKIE_NAME } from "@/lib/auth-constants";
import { auth as firebaseAuth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";

export type SessionUser = {
  userId: string;
  name: string;
  email: string;
  image: string;
};

type AuthContextType = {
  user: SessionUser | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  changePassword: (newPassword: string) => Promise<boolean>;
  updateProfileData: (newName?: string, newImage?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const translateAuthError = (error: unknown): string => {
  const code = (error as { code?: string })?.code ?? "";
  switch (code) {
    case "auth/invalid-email":
      return "Email không hợp lệ.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email hoặc mật khẩu không đúng.";
    case "auth/email-already-in-use":
      return "Email này đã được đăng ký. Hãy đăng nhập nhé!";
    case "auth/weak-password":
      return "Mật khẩu quá yếu (tối thiểu 6 ký tự).";
    case "auth/requires-recent-login":
      return "Vui lòng đăng xuất và đăng nhập lại trước khi đổi mật khẩu vì lý do bảo mật.";
    case "auth/too-many-requests":
      return "Bạn thử quá nhiều lần, vui lòng thử lại sau.";
    case "auth/network-request-failed":
      return "Lỗi kết nối mạng, vui lòng thử lại.";
    case "auth/operation-not-allowed":
      return "Phương thức này chưa được bật trong Firebase Console.";
    case "auth/popup-closed-by-user":
      return "Bạn đã đóng cửa sổ đăng nhập.";
    default:
      return error instanceof Error ? error.message : "Đã có lỗi xảy ra.";
  }
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isSignedIn: false,
  isLoaded: false,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => false,
  signUpWithEmail: async () => false,
  resetPassword: async () => false,
  changePassword: async () => false,
  updateProfileData: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Load session from cookie on mount
  useEffect(() => {
    try {
      const cookies = document.cookie.split("; ");
      const sessionCookie = cookies.find((c) => c.startsWith(`${AUTH_COOKIE_NAME}=`));
      if (sessionCookie) {
        const val = sessionCookie.split("=")[1];
        if (val) {
          const parsed = JSON.parse(decodeURIComponent(val));
          if (parsed?.userId) {
            setUser(parsed);
          }
        }
      }
    } catch {
      // Ignore parse errors
    } finally {
      setIsLoaded(true);
    }

    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          const userData: SessionUser = {
            userId: fbUser.uid,
            name: fbUser.displayName || "Học viên Google",
            email: fbUser.email || "",
            image: fbUser.photoURL || "/mascot.svg",
          };
          setUser(userData);
          await setServerSession(userData);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      if (isFirebaseConfigured) {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        const fbUser = result.user;
        const userData: SessionUser = {
          userId: fbUser.uid,
          name: fbUser.displayName || "Học viên Google",
          email: fbUser.email || "",
          image: fbUser.photoURL || "/mascot.svg",
        };
        setUser(userData);
        await setServerSession(userData);
        toast.success(`Xin chào, ${userData.name}!`);
        router.push("/learn");
      } else {
        // Fallback demo Google account when Firebase keys are not yet filled in .env.local
        const demoUser: SessionUser = {
          userId: "user_google_learner_demo",
          name: "Học viên Google (Demo)",
          email: "learner.google@gmail.com",
          image: "/mascot.svg",
        };
        setUser(demoUser);
        await setServerSession(demoUser);
        toast.success("Đăng nhập thành công với tài khoản Google! (Chế độ dùng thử)");
        router.push("/learn");
      }
    } catch (error: unknown) {
      console.error("Firebase Google sign in error:", error);
      toast.error(`Đăng nhập Google thất bại: ${translateAuthError(error)}`);
    }
  };

  const startSession = async (fbUser: FirebaseUser, fallbackName?: string) => {
    const userData: SessionUser = {
      userId: fbUser.uid,
      name:
        fbUser.displayName ||
        fallbackName ||
        fbUser.email?.split("@")[0] ||
        "Học viên TrioLingo",
      email: fbUser.email || "",
      image: fbUser.photoURL || "/mascot.svg",
    };
    setUser(userData);
    await setServerSession(userData);
    toast.success(`Xin chào, ${userData.name}!`);
    router.push("/learn");
  };

  const signInWithEmail = async (email: string, password: string) => {
    // Tai khoan Admin duoc xac thuc rieng tren server (khong qua Firebase)
    if (email.trim().toLowerCase() === ADMIN_EMAIL) {
      try {
        if (isFirebaseConfigured) {
          await firebaseSignOut(firebaseAuth).catch(() => undefined);
        }
        const result = await adminLogin(email, password);
        if (!result.success) {
          toast.error("Email hoặc mật khẩu không đúng.");
          return false;
        }
        const adminUser: SessionUser = {
          userId: ADMIN_USER_ID,
          name: ADMIN_DISPLAY_NAME,
          email: ADMIN_EMAIL,
          image: ADMIN_AVATAR,
        };
        setUser(adminUser);
        toast.success("Xin chào, Quản trị viên!");
        router.push("/learn");
        return true;
      } catch {
        toast.error("Không thể đăng nhập, vui lòng thử lại.");
        return false;
      }
    }

    if (!isFirebaseConfigured) {
      toast.error("Chưa cấu hình Firebase.");
      return false;
    }
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      await startSession(result.user);
      return true;
    } catch (error) {
      toast.error(translateAuthError(error));
      return false;
    }
  };

  const signUpWithEmail = async (name: string, email: string, password: string) => {
    if (!isFirebaseConfigured) {
      toast.error("Chưa cấu hình Firebase.");
      return false;
    }
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      if (name) await updateProfile(result.user, { displayName: name });
      await startSession(result.user, name);
      return true;
    } catch (error) {
      toast.error(translateAuthError(error));
      return false;
    }
  };

  const resetPassword = async (email: string) => {
    if (!isFirebaseConfigured) {
      toast.error("Chưa cấu hình Firebase.");
      return false;
    }
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      toast.success("Đã gửi email đặt lại mật khẩu. Hãy kiểm tra hộp thư của bạn!");
      return true;
    } catch (error) {
      toast.error(translateAuthError(error));
      return false;
    }
  };

  const changePassword = async (newPassword: string): Promise<boolean> => {
    if (!isFirebaseConfigured || !firebaseAuth.currentUser) {
      toast.error("Vui lòng đăng nhập bằng tài khoản email để đổi mật khẩu.");
      return false;
    }
    try {
      await updatePassword(firebaseAuth.currentUser, newPassword);
      toast.success("Cập nhật mật khẩu mới thành công!");
      return true;
    } catch (error) {
      toast.error(translateAuthError(error));
      return false;
    }
  };

  const updateProfileData = async (newName?: string, newImage?: string) => {
    if (!user) return;
    const updated: SessionUser = {
      ...user,
      name: newName || user.name,
      image: newImage || user.image,
    };
    setUser(updated);
    await setServerSession(updated);

    if (isFirebaseConfigured && firebaseAuth.currentUser) {
      try {
        await updateProfile(firebaseAuth.currentUser, {
          displayName: updated.name,
          photoURL: updated.image,
        });
      } catch (err) {
        console.error("Firebase updateProfile error:", err);
      }
    }
  };

  const signOut = async () => {
    try {
      if (isFirebaseConfigured) {
        await firebaseSignOut(firebaseAuth);
      }
      await clearServerSession();
      setUser(null);
      toast.success("Đã đăng xuất thành công!");
      router.push("/");
    } catch {
      toast.error("Không thể đăng xuất, vui lòng thử lại.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn: !!user,
        isLoaded,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        changePassword,
        updateProfileData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
