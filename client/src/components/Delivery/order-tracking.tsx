import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Phone, MessageSquare, MapPin, Package, X, Clock, Scale, Copy } from 'lucide-react'

export function OrderTracking() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Order Tracking</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium">Shipment/Order Tracker</h2>
              <p className="text-sm text-muted-foreground">Track shipment/Order using tracking ID</p>
            </div>

            <Select defaultValue="ordered-items">
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Ordered Items" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ordered-items">Ordered Items</SelectItem>
                <SelectItem value="tracking-id">Tracking ID</SelectItem>
              </SelectContent>
            </Select>

            <Input placeholder="Enter order number" className="bg-white" />

            <div className="flex gap-4">
              <Button variant="ghost" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                In Transit (23)
              </Button>
              <Button variant="ghost" className="text-gray-500 hover:text-gray-600 hover:bg-gray-50">
                In Progress (12)
              </Button>
              <Button variant="ghost" className="text-gray-500 hover:text-gray-600 hover:bg-gray-50">
                On Hold (5)
              </Button>
            </div>

            <Card className="border border-gray-100">
              <div className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Order Number</div>
                <div className="font-medium mb-2">XR-984573646</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  Warren cooper - Washington, Kenky
                </div>
                <Button variant="secondary" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                  Tracking...
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/placeholder.svg"
                alt="Customer"
                className="h-10 w-10 rounded-full bg-gray-100"
              />
              <div>
                <div className="font-medium">Darlene Robertson</div>
                <div className="text-sm text-muted-foreground">Customer</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative aspect-video rounded-xl bg-gray-50 overflow-hidden">
            <div className="absolute top-4 left-4 text-sm">
              Last update: 1 minute ago
            </div>
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/75 text-white text-sm">
              East mediterranean sea
            </div>
            <div className="absolute bottom-4 right-4 flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-6 bg-black"></div>
                <span>Road Ways</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-6 bg-blue-500"></div>
                <span>Sea</span>
              </div>
            </div>
          </div>

          <Card className="border-gray-100">
            <div className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Live Shipment Tracking</span>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Shipping ID:</span>
                  <span className="text-blue-500">#SP987654321</span>
                  <Button variant="ghost" size="icon" className="h-4 w-4 text-gray-400">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <Badge variant="secondary" className="bg-blue-50 text-blue-500">
                  In Transit
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <div className="flex justify-between text-sm mb-2">
                    <div>
                      <div className="text-gray-500">Departure</div>
                      <div className="font-medium">Aschaffenburg</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500">Destination</div>
                      <div className="font-medium">Frankfurt</div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-1/2 h-0.5 w-full bg-gray-100"></div>
                    <div className="relative z-10 flex justify-between">
                      <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500 bg-white"></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-gray-500">Package Shipped</div>
                    <div className="font-medium">23-11-2023, 11:20</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500">Estimated Package Received</div>
                    <div className="font-medium">23-11-2023, 11:58</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-sm">
                    <div className="text-gray-500 mb-1">Total Distance</div>
                    <div className="font-medium">225 km</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-500 mb-1">Est. Delivery Time</div>
                    <div className="font-medium">2h 40m</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-500 mb-1">Total Weight</div>
                    <div className="font-medium">14.5 kg</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

