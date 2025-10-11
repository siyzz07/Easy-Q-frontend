"use client"

import { PencilLine,Lock , CreditCard , MapPin,  Wallet, Bell} from "lucide-react"

const items = [
  { label: "Edit Profile", Icon: PencilLine },
  { label: "Addresses", Icon: MapPin },
  { label: "Wallet", Icon: Wallet },
  { label: "Payments", Icon: CreditCard },
  { label: "Notifications", Icon: Bell },
  { label: "Change Passwrod", Icon: Lock  },
]

 function ProfileTabs() {
  return (
    <div className="flex w-full flex-wrap items-center gap-x-6 gap-y-3  pb-3">
      {items.map(({ label, Icon }) => (
        <button
          key={label}
          className="inline-flex items-center gap-2 text-gray-500 text-sm text-foreground transition hover:text-black hover:font-semibold  "
          aria-label={label}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span className="uppercase tracking-tight text-foreground/90">{label}</span>
        </button>
      ))}
      <div className="mt-3 w-full border-1 border-gray-300" />
    </div>
  )
}

export default ProfileTabs