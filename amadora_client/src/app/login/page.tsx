"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleLogin = async () => {
        if (!username.trim()) return setMessage("Please enter a username");

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ username }),
            });
            
            const data = await response.json();
            if (response.ok) {
                router.push("/dashboard");
            } else {
                setMessage(data.message)
            }
        } catch (error) {
            setMessage("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="auth-heading">Login</h2>
            <Input
              type="text"
              placeholder="Enter your username"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {message && <p className="auth-message">{message}</p>}
            <Button className="auth-button" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-center mt-3">
              Don't have an account?{" "}
              <Button variant="link" onClick={() => router.push("/signup")}>
                Sign up
              </Button>
            </p>
          </div>
        </div>
      );
}