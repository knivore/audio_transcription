'use client';

import {useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {Input} from '@/app/components/ui/input';
import {Spinner} from '@/app/components/ui/icons';
import {Search} from 'lucide-react';

export function SearchInput({onSearchSuccess}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    async function searchAction(formData: FormData) {
        let value = formData.get('query') as string;
        let params = new URLSearchParams({query: value});

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/search?${params.toString()}`
            );
            const data = await response.json();
            onSearchSuccess(data.result);
        } catch (error) {
            console.error('Search error:', error);
            onSearchSuccess();
        }
    }

    return (
        <form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground"/>
            <Input
                name="query"
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"

            />
            {isPending && <Spinner additionalClass={"absolute"}/>}
        </form>
    );
}
