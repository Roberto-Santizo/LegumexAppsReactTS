import { LoteCDPDetailsSchema, LoteSchema, LotesSchema } from "@/utils/lotesSchemas";
import { z } from "zod";

export type Lote = z.infer<typeof LoteSchema>;
export type Lotes = z.infer<typeof LotesSchema>;
export type loteCDPDetails = z.infer<typeof LoteCDPDetailsSchema>;
