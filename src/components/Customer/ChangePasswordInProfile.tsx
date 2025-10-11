import React from 'react'

const ChangePasswordInProfile = () => {
  return (
    <div className="rounded-lg border border-gray-400 bg-card p-4 shadow-sm md:p-6">
      <h2 className="mb-4  font-bold text-xl">Reset Password</h2>

      <div className=" gap-4 md:col-span-2">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-foreground">
            User Namewwww
          </label>
          <input
            id="username"
            value="ftisa4500"
            readOnly
            disabled
            className="h-10 w-full rounded-md border-1 border-gray-400 bg-muted px-3 text-sm text-foreground/80 "
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            value="ftisa4500@mogash.com"
            readOnly
            disabled
            className="h-10 w-full rounded-md border-1 border-gray-400 bg-muted px-3 text-sm text-foreground/80 disabled:cursor-not-allowed"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone
          </label>
          <input
            id="phone"
            value="9072284410"
            readOnly
            disabled
            className="h-10 w-full rounded-md border-1 border-gray-400 bg-muted px-3 text-sm text-foreground/80 disabled:cursor-not-allowed"
          />
        </div>
      <div className="mt-5">
        <button className="inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 shadow-sm text-white transition hover:opacity-90">
          Submit
        </button>
      </div>
      </div>

    </div>
  )
}

export default ChangePasswordInProfile