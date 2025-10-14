import {
  Plus,
  Edit,
} from "lucide-react"

 const Services = () => {
  const services = [
    {
      name: "Classic Haircut",
      duration: "30 min",
      price: "$15",
      status: "Active",
      description:
        "Professional haircut with wash, style, and finish. Perfect for maintaining your signature look.",
    },
    {
      name: "Beard Trim & Shape",
      duration: "20 min",
      price: "$10",
      status: "Active",
      description:
        "Precision beard trimming and shaping to complement your facial structure.",
    },
    {
      name: "Premium Shave",
      duration: "45 min",
      price: "$25",
      status: "Active",
      description:
        "Traditional hot towel shave with premium products for the ultimate grooming experience.",
    },
    {
      name: "Hair Styling",
      duration: "25 min",
      price: "$20",
      status: "Inactive",
      description:
        "Professional styling service currently unavailable. Check back soon!",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          
            <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus size={16} className="mr-2" />
              Add Service
            </button>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      service.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-2 text-gray-500 text-sm">
                  <span>⏱ {service.duration}</span>
                  <span>💰 {service.price}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                <button className="self-start flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                  <Edit size={16} className="mr-2" />
                  Edit
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Services