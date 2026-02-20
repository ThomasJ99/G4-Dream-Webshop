'use client'

import { Search, Funnel } from 'lucide-react';

export default function SearchWidget() {
    return(
        <section className="flex p-3">
            
            <div className="flex gap-3 relative w-120 p-2 border-1 border-gray-300 rounded-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10"
                />
            </div>
        </section>
    )
}