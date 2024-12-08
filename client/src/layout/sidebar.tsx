import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Package, Users, Box, User, FileText, Truck, Clock } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const sidebarItems = [
  {
    icon: Package,
    label: "Orders",
    href: "/orders",
    children: [
      { label: "Assign Orders", href: "/orders/assign" }
    ]
  },
  {
    icon: Users,
    label: "Drivers",
    href: "/drivers"
  },
  {
    icon: Clock,
    label: "Track Orders",
    href: "/track-orders"
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile"
  },
  {
    icon: FileText,
    label: "Invoices",
    href: "/invoices"
  },
  {
    icon: Truck,
    label: "Cargo Buses",
    href: "/buses"
  }
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex flex-col border-r bg-background h-screen w-64">
      <div className="p-6">
        <div className="flex items-center gap-2 font-semibold">
          <Box className="h-6 w-6" />
          <span>Delivery System</span>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          {sidebarItems.map((item, index) => (
            <div key={index} className="space-y-1">
              <Link to={item.href}>
                <Button
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    location.pathname === item.href && "bg-muted"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
              {item.children?.map((child, childIndex) => (
                <Link key={childIndex} to={child.href}>
                  <Button
                    variant={location.pathname === child.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start pl-8",
                      location.pathname === child.href && "bg-muted"
                    )}
                  >
                    {child.label}
                  </Button>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

