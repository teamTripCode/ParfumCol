// page.tsx
import LotionInfo from '@/components/LotionInfo';
import { use } from 'react';

function InfoLotion({ params }: { params: Promise<{ lotionId: string }> }) {
    const resolvedParams = use(params);
    return <LotionInfo lotionId={resolvedParams.lotionId} />;
}

export default InfoLotion;