import React from 'react'

const Filter = () => {
  return (
   <div className="sticky top-4 rounded-lg bg-card p-4 shadow-sm bg-white">
      <h3 className="mb-3 text-sm font-semibold">Filters</h3>

      <div className="space-y-4 text-sm">
        <fieldset>
          <legend className="mb-2 text-xs font-medium text-muted-foreground">Ratings</legend>
          <div className="grid gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" /> 5 Stars
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" /> 4+ Stars
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" /> 3+ Stars
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs font-medium text-muted-foreground">Categories</legend>
          <div className="grid gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" />
              Salon
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" />
              Barber
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" />
              Auto
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" />
              Home
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" />
              Health
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs font-medium text-muted-foreground">Features</legend>
          <div className="grid gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" />
              Open now
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" />
              Discount
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border" />
              Verified
            </label>
          </div>
        </fieldset>

        <button className="mt-2 w-full rounded-md bg-brand px-3 py-2 text-xs font-medium text-white">
          Apply Filters
        </button>
      </div>
    </div>
  )
}

export default Filter