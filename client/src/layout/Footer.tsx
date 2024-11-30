import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  "About Modimal": [
    "About Us",
    "Sustainability",
    "Privacy Policy",
    "Support System",
    "Size Guide & Photos",
  ],
  "Help & Support": [
    "Returns & Shipping",
    "Returns & Exchange",
    "FAQs",
    "Contact Us",
  ],
  "Join Us": ["Modimal Club", "Careers", "Visit Us"],
};

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-medium mb-4">Join Our Club</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get 15% off your first order and be the first to know about
              upcoming promotions.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Join</Button>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-medium mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2024 Modimal. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
