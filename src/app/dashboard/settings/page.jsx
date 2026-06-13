"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { changePassword, deleteAccount } from "@/services/authServices";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  ShieldAlert,
  Bell,
  Trash2,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
import ConfirmModal from "@/components/Modals/ConfirmModal";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Preferences state (visual demo)
  const [prefEmail, setPrefEmail] = useState(true);
  const [prefWeekly, setPrefWeekly] = useState(false);

  // Modal state for delete account
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);  

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    setSubmitting(true);
    try {
      const result = await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (result.success) {
        toast.success(result.message || "Password updated successfully!");
        reset();
      }
    } catch (error) {
      console.error("Change password error:", error);
      toast.error(error?.message || "Failed to update password. Please check your old password.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAccount();
      if (result.success) {
        toast.success(result.message || "Account deleted successfully.");
        await logout();
        router.replace("/");
      } else {
        toast.error(result.message || "Failed to delete account.");
      }
    } catch (err) {
      console.error("Delete account error:", err);
      toast.error("Error deleting account.");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf8] pb-12">
      {/* Header */}
      <div className="bg-linear-to-r from-[#f8f3eb] to-[#f0e4d4] border-b border-[#e5ddd0] px-6 py-8 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4d3b2a] font-serif tracking-tight">Settings</h1>
          <p className="text-[#5b4a3a] mt-1 text-sm md:text-base">
            Manage your credentials, security settings, notifications, and preferences.
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-8 md:px-8 space-y-8">
        {/* Account Info Section */}
        <section className="bg-white rounded-2xl border border-[#e5ddd0] p-6 shadow-xs">
          <h3 className="text-lg font-bold text-[#4d3b2a] font-serif mb-6 pb-2 border-b border-[#e5ddd0]/60 flex items-center gap-2">
            <User size={18} className="text-[#9c682f]" />
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d3b2a]/60 mb-2">Username</label>
              <div className="flex items-center gap-3 bg-[#fdfbf8] p-3.5 rounded-xl border border-[#e5ddd0]/50 text-[#5b4a3a] select-all cursor-text font-mono text-sm">
                <User size={16} className="text-[#9c682f]/60 shrink-0" />
                <span>{user?.username || "N/A"}</span>
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4d3b2a]/60 mb-2">Email Address</label>
              <div className="flex items-center gap-3 bg-[#fdfbf8] p-3.5 rounded-xl border border-[#e5ddd0]/50 text-[#5b4a3a] select-all cursor-text font-mono text-sm">
                <Mail size={16} className="text-[#9c682f]/60 shrink-0" />
                <span>{user?.email || "N/A"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Change Password Section */}
        <section className="bg-white rounded-2xl border border-[#e5ddd0] p-6 shadow-xs">
          <h3 className="text-lg font-bold text-[#4d3b2a] font-serif mb-6 pb-2 border-b border-[#e5ddd0]/60 flex items-center gap-2">
            <KeyRound size={18} className="text-[#9c682f]" />
            Change Password
          </h3>
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg">
            {/* Old Password */}
            <div className="relative">
              <Controller
                name="oldPassword"
                control={control}
                rules={{ required: "Old password is required" }}
                render={({ field }) => (
                  <TextField
                    isRequired
                    name="oldPassword"
                    type={showOldPass ? "text" : "password"}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <Label className="uppercase text-xs font-semibold text-[#4d3b2a]/70">Current Password</Label>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        className="rounded-sm custom-input pr-10"
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPass(!showOldPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                      >
                        {showOldPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <FieldError />
                  </TextField>
                )}
              />
            </div>

            {/* New Password */}
            <div className="relative">
              <Controller
                name="newPassword"
                control={control}
                rules={{
                  required: "New password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                }}
                render={({ field }) => (
                  <TextField
                    isRequired
                    name="newPassword"
                    type={showNewPass ? "text" : "password"}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <Label className="uppercase text-xs font-semibold text-[#4d3b2a]/70">New Password</Label>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        className="rounded-sm custom-input pr-10"
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                      >
                        {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <FieldError />
                  </TextField>
                )}
              />
            </div>

            {/* Confirm New Password */}
            <div className="relative">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: "Please confirm your new password" }}
                render={({ field }) => (
                  <TextField
                    isRequired
                    name="confirmPassword"
                    type={showConfirmPass ? "text" : "password"}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <Label className="uppercase text-xs font-semibold text-[#4d3b2a]/70">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        className="rounded-sm custom-input pr-10"
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                      >
                        {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <FieldError />
                  </TextField>
                )}
              />
            </div>

            <Button type="submit" isDisabled={submitting} className="bg-[#9c682f] hover:bg-[#865623] text-white px-6 py-2.5 rounded-xl font-medium shadow-xs transition-all duration-300 cursor-pointer text-sm mt-2">
              {submitting ? "Updating..." : "Update Password"}
            </Button>
          </Form>
        </section>

        {/* Preferences & Notifications Section */}
        <section className="bg-white rounded-2xl border border-[#e5ddd0] p-6 shadow-xs">
          <h3 className="text-lg font-bold text-[#4d3b2a] font-serif mb-6 pb-2 border-b border-[#e5ddd0]/60 flex items-center gap-2">
            <Bell size={18} className="text-[#9c682f]" />
            Preferences & Notifications
          </h3>
          <div className="space-y-4 max-w-xl">
            {/* Email notifications */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#fdfbf8] border border-[#e5ddd0]/40">
              <div>
                <p className="text-sm font-semibold text-[#4d3b2a]">Email notifications</p>
                <p className="text-xs text-[#5b4a3a]/75 mt-0.5">Receive email alerts for updates and new blog comments.</p>
              </div>
              <button
                type="button"
                onClick={() => setPrefEmail(!prefEmail)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-hidden ${prefEmail ? "bg-[#9c682f]" : "bg-gray-200"}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-250 ease-in-out ${prefEmail ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
            {/* Weekly newsletter */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#fdfbf8] border border-[#e5ddd0]/40">
              <div>
                <p className="text-sm font-semibold text-[#4d3b2a]">Weekly Newsletter</p>
                <p className="text-xs text-[#5b4a3a]/75 mt-0.5">Get a weekly digest of trending articles on Trendy Kotha.</p>
              </div>
              <button
                type="button"
                onClick={() => setPrefWeekly(!prefWeekly)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-hidden ${prefWeekly ? "bg-[#9c682f]" : "bg-gray-200"}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-250 ease-in-out ${prefWeekly ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-50/45 rounded-2xl border border-red-200 p-6">
          <h3 className="text-lg font-bold text-red-800 font-serif mb-3 flex items-center gap-2">
            <ShieldAlert size={18} className="text-red-700" />
            Danger Zone
          </h3>
          <p className="text-sm text-red-700/80 mb-5 max-w-xl">
            Deleting your account will permanently remove all your published blogs, comments, bookmarks, and settings. This action is irreversible.
          </p>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer text-sm"
          >
            <Trash2 size={16} />
            Delete Account
          </button>
        </section>
      </div>

      {/* Delete Account Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        description="This action cannot be undone. All your account data will be permanently deleted."
        confirmText="Delete Account"
        confirmColor="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}