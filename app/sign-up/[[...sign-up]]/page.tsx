import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 px-4">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl border border-gray-100 rounded-2xl",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-500",
              socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
              formFieldLabel: "text-gray-700",
              formFieldInput: "border-gray-300 focus:border-primary focus:ring-primary",
              formButtonPrimary: "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold",
              footerActionLink: "text-primary hover:text-primary/80 font-medium",
            },
          }}
        />
      </div>
    </div>
  );
}
