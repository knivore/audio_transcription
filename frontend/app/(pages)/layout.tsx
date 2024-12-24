'use client';

import {LayoutDashboard, Mail, Menu} from 'lucide-react';
import {Sheet, SheetContent, SheetTrigger} from '@/app/components/ui/sheet';
import {TooltipProvider} from '@/app/components/ui/tooltip';
import {NavItem} from '@/app/components/ui/nav_item';
import React, {useState} from "react";

export default function AppLayout({children}: {
    children: React.ReactNode;
}) {
    const [isNavOpen, setIsNavOpen] = useState(true);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <TooltipProvider>
            <main className="flex min-h-[calc(100vh-100px)] w-full flex-col bg-muted/40">
                <DesktopNav isOpen={isNavOpen} toggleNav={toggleNav}/>
                <div className={`flex flex-col sm:pl-14 transition-all duration-300 ease-in-out
                    ${isNavOpen ? 'sm:ml-52' : 'ml-0'}`}>
                    <header
                        className="sticky top-0 z-30 flex sm:py-4 h-14 items-center justify-between border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <div className="flex items-center gap-4">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="h-10 w-10"
                            />

                            <div className="text-base sm:text-lg md:text-xl lg:text-4xl font-semibold text-primary">
                                Audio Transcription
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex">
                            </div>
                            <MobileNav/>
                        </div>
                    </header>
                    <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                        {children}
                    </main>
                </div>
            </main>
        </TooltipProvider>
    );
}


function DesktopNav({isOpen, toggleNav}) {
    return (
        <aside
            className={`fixed inset-y-0 left-0 z-20 hidden flex-col border-r bg-background transition-all duration-300
                ${isOpen ? 'w-64' : 'w-16'} sm:flex`}>
            <nav className="flex flex-col items-start gap-4 px-4 py-6 pt-14">
                <NavItem href="/dashboard" label="Dashboard" isDrawerOpen={isOpen}>
                    <LayoutDashboard className="h-6 w-6 text-primary"/>
                </NavItem>
            </nav>

            <nav className="mt-auto flex flex-col items-end gap-4 px-4 py-6">
                <button onClick={toggleNav}
                        className="flex w-full justify-end p-2 rounded hover:bg-muted">
                    <span className="sr-only">{isOpen ? "Collapse" : "Expand"} Drawer</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-transform ${isOpen ? "" : "rotate-180"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>
            </nav>
        </aside>
    );
}

function MobileNav() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

    return (
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetTrigger asChild>
                <button onClick={toggleDrawer}
                        className="sm:hidden flex items-center justify-center p-2 rounded hover:bg-muted">
                    <Menu className="h-5 w-5"/>
                    <span className="sr-only">Toggle Menu</span>
                </button>
            </SheetTrigger>

            <SheetContent side="left" hideCloseButton
                          className={`sm:max-w-xs p-0 ${isDrawerOpen ? "w-52" : "w-16"} transition-all`}>
                <nav className="flex flex-col gap-6 h-full px-3 pt-10" onClick={toggleDrawer}>
                    <div className="flex flex-col gap-3">
                        <NavItem href="/dashboard" label="Dashboard" isDrawerOpen={isDrawerOpen}>
                            <LayoutDashboard className="h-6 w-6 text-primary"/>
                        </NavItem>
                    </div>

                    <div className="mt-auto flex flex-col">
                        <NavItem href="mailto:cpf-cds-cdwp@cpf.gov.sg" label="" isDrawerOpen={isDrawerOpen}>
                            <div className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800">
                                <Mail className="h-4 w-4"/>
                                <span>Email Support</span>
                            </div>
                        </NavItem>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
