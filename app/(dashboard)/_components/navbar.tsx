'use client'


import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { SearchInput } from "@/app/(dashboard)/_components/search-input";

export const Navbar = () => {
    return (
        <div
            className="
                flex
                items-center
                gap-x-4
                p-5
                bg-green-500
            "
        >
            <div
                className="
                    hidden
                    lg:flex
                    lg:flex-1
                    bg-yellow-500
                "
            >
                <SearchInput/>
            </div>
            <div
                className="
                    block
                    lg:hidden
                    flex-1
                "
            >
                <OrganizationSwitcher
                    hidePersonal
                    appearance={ {
                        elements: {
                            rootBox: {
                                display: 'flex',
                                justifyContent: 'center',
                                alignsItems: 'center',
                                width: '100%',
                                maxWidth: '376px'
                            },
                            organizationSwitcherTrigger: {
                                padding: '6px',
                                width: '100%',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                                justifyContent: 'space-between',
                                backgroundColor: 'white'
                            }
                        }
                    } }
                />
            </div>
            <UserButton/>
        </div>
    )
}
