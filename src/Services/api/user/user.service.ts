import type { User } from "../auth/auth.service";
import { request } from "../request";

export type UpdateMePayload = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  dateOfBirth?: string; // "YYYY-MM-DD"
  currentPassword: string;
  newPassword?: string;
};

export type UpdateAvatarPayload = {
  avatarUrl: string;     // Cloudinary secure_url
  avatarPublicId?: string; // Cloudinary public_id (optional but recommended)
};

export type UploadAvatarBase64Payload = {
  base64: string; // deprecated fallback
};

export const userService = {
  updateMe: (payload: UpdateMePayload) => {
    return request.patch<{ success: boolean; user: User; message?: string }>(
      "/api/users/me",
      payload
    );
  },

  /**
   * ✅ New: just save avatar URL to your backend
   * Backend route example: PATCH /api/users/me/avatar
   * Body: { avatarUrl, avatarPublicId }
   */
  updateAvatar: (payload: UpdateAvatarPayload) => {
    return request.patch<{ success: boolean; user: User; message?: string }>(
      "/api/users/me/avatar",
      payload
    );
  },

  /**
   * ⚠️ Old fallback: base64 (keep only if you want backwards compatibility)
   */
  uploadAvatarBase64: (payload: UploadAvatarBase64Payload) => {
    return request.patch<{ success: boolean; user: User; message?: string }>(
      "/api/users/me/avatar/base64",
      payload
    );
  },

  deleteMe: (payload: { currentPassword: string }) => {
    return request.delete<{ success: boolean; message?: string }>(
      "/api/users/me",
      { data: payload } as any
    );
  },
};
