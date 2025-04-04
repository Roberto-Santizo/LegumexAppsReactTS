import { z } from 'zod';

export const FiletrsBoletaRMPSchema = z.object({
    finca_id: z.string(),
    product_id: z.string(),
    producer_id: z.string(),
    date: z.string(),
    plate: z.string(),
    quality_status_id: z.string(),
    ref_doc: z.string(),
    grn: z.string(),
});