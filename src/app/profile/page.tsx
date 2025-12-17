"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const { data: session, update } = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setEmail(session.user.email || "");
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (newPassword || confirmPassword || currentPassword) {
            if (!currentPassword) {
                setError("Please enter your current password");
                return;
            }
            if (newPassword !== confirmPassword) {
                setError("New passwords do not match");
                return;
            }
            if (newPassword.length < 6) {
                setError("New password must be at least 6 characters");
                return;
            }
        }

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    currentPassword: currentPassword || undefined,
                    newPassword: newPassword || undefined,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Profile updated successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                await update({ name });
            } else {
                setError(data.message || "Failed to update profile");
            }
        } catch (err) {
            setError("An error occurred while updating profile");
        }
    };

    if (!session) {
        return <div className="text-center mt-10">Please login to view this page.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">
            <div className="clay-card p-8">
                <h2 className="text-3xl font-bold gradient-text-clay mb-6">Profile Settings</h2>

                {message && (
                    <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-200 text-emerald-700 rounded-2xl">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border-2 border-rose-200 text-rose-700 rounded-2xl">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="clay-label">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="clay-input"
                        />
                    </div>

                    <div>
                        <label className="clay-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            disabled
                            className="clay-input bg-[#F5F5F7] cursor-not-allowed"
                        />
                    </div>

                    <div className="border-t-2 border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-[#2D2D2D] mb-4">Change Password (Optional)</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="clay-label">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="clay-input"
                                />
                            </div>

                            <div>
                                <label className="clay-label">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="clay-input"
                                />
                            </div>

                            <div>
                                <label className="clay-label">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="clay-input"
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="clay-btn w-full">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
