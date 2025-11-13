"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Briefcase, Loader2 } from "lucide-react"

const employerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name is required"),
  employerType: z.enum(["COMPANY", "AGENCY", "CLIENT"], {
    errorMap: () => ({ message: "Please select an employer type" }),
  }),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type EmployerFormData = z.infer<typeof employerSchema>

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function EmployerAuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
  })

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSignup = async (data: EmployerFormData) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: "EMPLOYER" }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Registration failed")
      }

      toast.success("Account created! Logging you in...")
      
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (signInResult?.error) {
        toast.error("Login failed. Please try again.")
      } else {
        router.push("/employer/dashboard")
        router.refresh()
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid email or password")
      } else {
        router.push("/employer/dashboard")
        router.refresh()
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: string) => {
    setOauthLoading(provider)
    try {
      await signIn(provider, {
        callbackUrl: "/employer/dashboard",
      })
    } catch (error) {
      toast.error(`Failed to sign in with ${provider}`)
      setOauthLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-[#0A66C2] rounded-full flex items-center justify-center mb-4">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? "Employer Login" : "Employer Sign Up"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Welcome back! Post jobs for free."
              : "Post jobs for free in 2 minutes"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLogin ? (
            <div className="space-y-4">
              {/* OAuth Buttons */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOAuthSignIn("google")}
                  disabled={oauthLoading !== null}
                >
                  {oauthLoading === "google" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOAuthSignIn("yahoo")}
                  disabled={oauthLoading !== null}
                >
                  {oauthLoading === "yahoo" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="#6001D2">
                        <path d="M12.23 2C6.18 2 1.25 6.93 1.25 13c0 6.05 4.93 11 10.98 11s10.98-4.95 10.98-11c0-6.07-4.93-11-10.98-11zm3.14 15.42h-2.74l-.74-2.48-3.11-7.07h2.68l1.97 5.02 1.92-5.02h2.62l-3.86 9.29z"/>
                      </svg>
                      Continue with Yahoo
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOAuthSignIn("azure-ad")}
                  disabled={oauthLoading !== null}
                >
                  {oauthLoading === "azure-ad" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 23 23">
                        <path fill="#f25022" d="M0 0h11v11H0z"/>
                        <path fill="#00a4ef" d="M12 0h11v11H12z"/>
                        <path fill="#7fba00" d="M0 12h11v11H0z"/>
                        <path fill="#ffb900" d="M12 12h11v11H12z"/>
                      </svg>
                      Continue with Outlook
                    </>
                  )}
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerLogin("email")}
                    disabled={isLoading}
                  />
                  {loginErrors.email && (
                    <p className="text-sm text-red-500 mt-1">{loginErrors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...registerLogin("password")}
                    disabled={isLoading}
                  />
                  {loginErrors.password && (
                    <p className="text-sm text-red-500 mt-1">{loginErrors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#0A66C2] hover:bg-[#0A66C2]/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Sign In"}
                </Button>
              </form>
            </div>
          ) : (
            <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  {...registerSignup("name")}
                  disabled={isLoading}
                />
                {signupErrors.name && (
                  <p className="text-sm text-red-500 mt-1">{signupErrors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  {...registerSignup("companyName")}
                  disabled={isLoading}
                />
                {signupErrors.companyName && (
                  <p className="text-sm text-red-500 mt-1">{signupErrors.companyName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="employerType">Employer Type *</Label>
                <select
                  id="employerType"
                  {...registerSignup("employerType")}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select type...</option>
                  <option value="COMPANY">Company (Requires verification)</option>
                  <option value="AGENCY">Recruitment Agency (Optional verification)</option>
                  <option value="CLIENT">Client/Direct Hire (Optional verification)</option>
                </select>
                {signupErrors.employerType && (
                  <p className="text-sm text-red-500 mt-1">{signupErrors.employerType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  {...registerSignup("email")}
                  disabled={isLoading}
                />
                {signupErrors.email && (
                  <p className="text-sm text-red-500 mt-1">{signupErrors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactEmail">Public Contact Email (Optional)</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="your-company@example.com"
                  {...registerSignup("contactEmail")}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Public Contact Phone (Optional)</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  {...registerSignup("contactPhone")}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  {...registerSignup("password")}
                  disabled={isLoading}
                />
                {signupErrors.password && (
                  <p className="text-sm text-red-500 mt-1">{signupErrors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0A66C2] hover:bg-[#0A66C2]/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-xs text-muted-foreground px-4">
            By clicking any of the &apos;Continue&apos; options above, you understand and agree to ApplyNHire&apos;s{" "}
            <Link href="/terms" className="text-[#0A66C2] hover:underline">
              Terms
            </Link>
            . You also acknowledge our{" "}
            <Link href="/cookies" className="text-[#0A66C2] hover:underline">
              Cookie
            </Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-[#0A66C2] hover:underline">
              Privacy
            </Link>
            {" "}policies. You will receive marketing messages from ApplyNHire and may opt out at any time by following the unsubscribe link in our messages, or as detailed in our terms.
          </div>

          <div className="text-center text-sm">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-[#0A66C2] hover:underline font-semibold"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-[#0A66C2] hover:underline font-semibold"
                >
                  Login
                </button>
              </>
            )}
          </div>

          <div className="text-center text-sm text-gray-500">
            <Link href="/auth/applicant" className="text-[#0A66C2] hover:underline">
              Looking for jobs? Applicant login →
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
