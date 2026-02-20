'use client'

import { ChevronDown, Funnel, Search } from 'lucide-react';

export default function SearchWidget() {
    return(
        <section className="flex p-3 gap-10 border border-gray-100 items-center">
            
            <div className="flex gap-3 relative w-120 p-1.5 border border-gray-300 rounded-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10"
                />
            </div>

            <div className="flex p-1.5 border border-gray-300 rounded-xl">
                <button className="flex gap-4 items-center" type="button">
                    All categories
                    <ChevronDown />
                </button>
            </div>

            <div className="flex p-1.5 border border-gray-300 rounded-xl">
                <button className="flex gap-4 items-center" type="button">
                    All status
                    <ChevronDown />
                </button>
            </div>

            <div className="flex p-1.5 border border-gray-300 rounded-xl">
                <button className="flex gap-2 px-2 items-center" type="button">
                    <Funnel className="w-4 h-4 fill-black stroke-black"/>
                    Filter
                </button>
            </div>
        </section>
    )
}