"use client"
// page.tsx

import LotionInfo from '@/components/LotionInfo';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/navigation';
import { use } from 'react';

function InfoLotion({ params }: { params: Promise<{ lotionId: string }> }) {
    const resolvedParams = use(params);

    return (
        <>
            <NavBar />
            <LotionInfo lotionId={resolvedParams.lotionId} />;
        </>
    )
}

export default InfoLotion;