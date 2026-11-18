"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, AlertCircle, CheckCircle2, Loader2, Save, MapPin, Globe, Sparkles } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/icons";

interface ProfileFormProps {
  user: {
    handle: string;
    name: string;
    email: string;
    headline?: string | null;
    bio?: string | null;
    location?: string | null;
    avatarUrl?: string | null;
    socialLinks?: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      website?: string;
    } | null;
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, undefined);
  const socials = user.socialLinks || {};

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50 flex items-center gap-2.5">
          <User className="h-7 w-7 text-emerald-400" />
          <span>Profile Settings</span>
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your personal biography, headline, avatar, and social connectivity.
        </p>
      </div>

      <Card className="bg-zinc-900/60 border-zinc-800/80 rounded-2xl p-8 sm:p-10 py-8 gap-0 space-y-6">
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{state.error}</span>
            </div>
          )}

          {state?.success && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {/* Name & Handle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name}
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="handle" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Public Handle (Permanent)
              </Label>
              <Input
                id="handle"
                type="text"
                disabled
                value={`@${user.handle}`}
                className="h-11 rounded-xl bg-zinc-950/40 border-zinc-800/60 text-sm font-mono text-zinc-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Headline & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="headline" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Headline / Title
              </Label>
              <Input
                id="headline"
                name="headline"
                type="text"
                defaultValue={user.headline || ""}
                placeholder="e.g. Staff Distributed Systems Architect"
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                defaultValue={user.location || ""}
                placeholder="e.g. San Francisco, CA"
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>
          </div>

          {/* Avatar URL */}
          <div className="space-y-1.5">
            <Label htmlFor="avatarUrl" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Avatar Image URL
            </Label>
            <Input
              id="avatarUrl"
              name="avatarUrl"
              type="url"
              defaultValue={user.avatarUrl || ""}
              placeholder="https://images.unsplash.com/photo-... or GitHub avatar"
              className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
            />
          </div>

          {/* Biography */}
          <div className="space-y-1.5">
            <Label htmlFor="bio" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Personal Bio &amp; Background (Visual Editor)
            </Label>
            <RichTextEditor
              id="bio"
              name="bio"
              defaultValue={user.bio}
              minHeight="180px"
              placeholder="Tell visitors about your philosophy, background, leadership style, or what you enjoy building. Use toolbar buttons for bold text, lists, and headings..."
            />
          </div>

          {/* Social Links Section */}
          <div className="space-y-4 pt-4 border-t border-zinc-800/60">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-400" />
                <span>Social Profiles & Contact Links</span>
              </h3>
              <p className="text-xs text-zinc-400">
                These will render as one-click badges on your portfolio header and bento cards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="github" className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub Profile</span>
                </Label>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  defaultValue={socials.github || ""}
                  placeholder="https://github.com/username"
                  className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="twitter" className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <TwitterIcon className="h-3.5 w-3.5" />
                  <span>Twitter / X Profile</span>
                </Label>
                <Input
                  id="twitter"
                  name="twitter"
                  type="url"
                  defaultValue={socials.twitter || ""}
                  placeholder="https://twitter.com/username"
                  className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="linkedin" className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <LinkedinIcon className="h-3.5 w-3.5" />
                  <span>LinkedIn Profile</span>
                </Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  defaultValue={socials.linkedin || ""}
                  placeholder="https://linkedin.com/in/username"
                  className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="website" className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  <span>Personal Website / Blog</span>
                </Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  defaultValue={socials.website || ""}
                  placeholder="https://yourdomain.com"
                  className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end pt-4 border-t border-zinc-800/60">
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 px-7 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow-lg shadow-emerald-500/10 cursor-pointer"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Profile...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Profile
                </span>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
