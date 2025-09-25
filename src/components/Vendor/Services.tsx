// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Settings,
  Calendar,
  CreditCard,
  Users,
  Briefcase,
  FileText,
  User,
  LogOut,
  Plus,
  Edit,
} from "lucide-react"

export default function Services() {
  const services = [
    {
      name: "Classic Haircut",
      duration: "30 min",
      price: "$15",
      status: "Active",
      description: "Professional haircut with wash, style, and finish. Perfect for maintaining your signature look.",
    },
    {
      name: "Beard Trim & Shape",
      duration: "20 min",
      price: "$10",
      status: "Active",
      description: "Precision beard trimming and shaping to complement your facial structure.",
    },
    {
      name: "Premium Shave",
      duration: "45 min",
      price: "$25",
      status: "Active",
      description: "Traditional hot towel shave with premium products for the ultimate grooming experience.",
    },
    {
      name: "Hair Styling",
      duration: "25 min",
      price: "$20",
      status: "Inactive",
      description: "Professional styling service currently unavailable. Check back soon!",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 p-8">
          {/* Add Service Button */}
          <div className="mb-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus size={16} className="mr-2" />
              Add Service
            </button>
          </div>

          {/* Services List */}
          <div className="space-y-4">
            {/* {services.map((service, index) => (
              <card key={index} className="p-6 bg-white shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>⏱ {service.duration}</span>
                        <span>💰 {service.price}</span>
                        <Badge
                          variant={service.status === "Active" ? "default" : "destructive"}
                          className={
                            service.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white ml-6">
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                </div>
              </Card>
            ))} */}
          </div>
        </main>
      </div>
    </div>
  )
}
