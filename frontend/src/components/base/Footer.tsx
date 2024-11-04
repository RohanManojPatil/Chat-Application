import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="p-6 bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <div>© 2024 QuickChat. All rights reserved.</div>
          <div className="space-x-4 mt-2">
            <Link href="/privacy-policy" aria-label="Privacy Policy">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" aria-label="Terms of Service">
              Terms of Service
            </Link>
          </div>
        </div>
        
        <form className="mt-4 md:mt-0 space-y-4 text-center md:text-left" aria-label="Subscribe to our newsletter">
          <Input
            placeholder="Subscribe to our newsletter"
            className="bg-gray-800 border-none"
            aria-label="Email address"
          />
          <Button aria-label="Subscribe to newsletter">Subscribe</Button>
        </form>
      </div>
    </footer>
  );
}
