'use client'

import qs from 'query-string'
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


export const SearchInput = () => {
    return (
        <div className="w-full relative">
            <Search />
            <Input
                className="
                    w-full
                    max-w-[516px]
                "
            />
        </div>
    )
}
