import { z } from 'zod'
import { AuthUserSchema, DraftUserSchema, UserDetailsSchema, UserSchema, UsersSchema } from '@/utils/users-schema'
import { Role } from '@/utils/roles-schema'
import { Permission } from '@/utils/permissions-schema'
import { TareaSchema, TareasPaginateSchema } from '@/utils/tareas-schema'
import { CDPSchema, Crop, DraftCDP, Plantation, PlantationsPaginateSchema, PlantationsSchema, Recipe } from '@/utils/plantation-schema'
import { DraftLote, LoteSchema, LotesPaginateSchema } from '@/utils/lotes-schema'
import { Finca } from '@/utils/fincas-schema'
import { SummaryWeeklyPlanSchema, WeeklyPlan, WeeklyPlansPaginateSchema, WeeklyPlansSchema } from '@/utils/weekly_plans-schema'
import { DraftTaskWeeklyPlan, TaskInsumoSchema, TasksWeeklyPlanSchema, TaskWeeklyPlanDetailsSchema, TaskWeeklyPlanSchema } from '@/utils/taskWeeklyPlan-schema'
import { EmployeeSchema } from '@/utils/employee-schema'
import { DraftTaskCropWeeklyPlanSchema, EmployeesTaskCropPlanSchema, EmployeeTaskCropPlanSchema, TaskCropIncompleteSchema, TaskCropSchema, TaskCropWeeklyPlanDetailSchema } from '@/utils/taskCropWeeklyPlan-schema'
import { TaskCropWeeklyPlanSchema, TasksCropWeeklyPlanSchema } from "../utils/taskCropWeeklyPlan-schema"
import { InsumoSchema, InsumosSchema } from '@/utils/insumos-schema'
import { LoteCDPDetailsSchema } from '@/utils/loteCDPDetails-schema'
import { FinishedTaskSchema, SummaryFincaTasksSchema, SummaryHoursEmployeeSchema, SummaryHoursEmployeesSchema, TaskCropInProgressSchema, TaskInProgressSchema } from '@/utils/dashboard-schema'
import { DetailProductSchema, DraftProductSchema, ProductSchema, ProductsPaginateSchema } from '@/utils/product-schema'
import { BoletaInfoAllSchema, BoletaRMPDetailSchema, BoletaSchema, BoletasPaginateSchema, DraftBoletaControlCalidadSchema, DraftBoletaSchema, DraftBoletaTransportSchema, DraftFormProdSchema, ResultsQualityControlDocSchema } from '@/utils/boletarmp-schema'
import { BasketSchema } from '@/utils/baskets-schema'
import { VarietiesPaginateSchema, VarietySchema } from '@/utils/calidadVariedades-schema'
import { DefectSchema, DefectsPaginateSchema, DraftDefectoSchema } from '@/utils/defectos-schema'
import { ProducerSchema, ProducersPaginateSchema } from '@/utils/producers-schema'
import { FiletrsBoletaRMPSchema } from '@/utils/filters-schema'
import { PlantaSchema } from '@/utils/plantas-schema'
import { DraftTransporteCondicionSchema, TransporteConditionSchema, TransporteConditionsPaginateSchema, TransporteInspectionSchema, TransporteInspectionsPaginateSchema } from '@/utils/transportecondicion-schema'


//PERMISOS
export type Permission = z.infer<typeof Permission>
export type DraftPermssion = Omit<Permission, 'id' | 'created_at' | 'updated_at'>

//ROLES
export type Role = z.infer<typeof Role>
export type DraftRole = Omit<Role, 'id'>

//USUARIOS
export type User = z.infer<typeof UserSchema>
export type Users = z.infer<typeof UsersSchema>
export type DraftUser = z.infer<typeof DraftUserSchema>
export type UserDetail = z.infer<typeof UserDetailsSchema>
export type AuthUser = z.infer<typeof AuthUserSchema>

// export type UserCollection = z.infer<typeof UserCollectionSchema>


export type LoginUser = {
    username: string,
    password: string,
}

//TAREAS
export type Tarea = z.infer<typeof TareaSchema>
export type TareasPaginate = z.infer<typeof TareasPaginateSchema>

//TAREA COSECHA
export type TaskCrop = z.infer<typeof TaskCropSchema >

export type DraftTarea = Omit<Tarea, 'id' >

//CULTIVOS
export type Crop = z.infer<typeof Crop>

//CPDS
export type Recipe = z.infer<typeof Recipe >

export type Plantation = z.infer<typeof Plantation>
export type CDP = z.infer<typeof CDPSchema>
export type Plantations = z.infer<typeof PlantationsSchema>
export type PlantationsPaginate = z.infer<typeof PlantationsPaginateSchema>


export type DraftCDP = z.infer<typeof DraftCDP>


//LOTES
export type Lote = z.infer<typeof LoteSchema>
export type PaginatedLotes = z.infer<typeof LotesPaginateSchema>
export type loteCDPDetails = z.infer<typeof LoteCDPDetailsSchema>

export type DraftLote = z.infer<typeof DraftLote>

//FINCAS
export type Finca = z.infer<typeof Finca >

//PLANES
export type WeeklyPlan = z.infer<typeof WeeklyPlan>
export type WeeklyPlans = z.infer<typeof WeeklyPlansSchema>
export type WeeklyPlansPaginate = z.infer<typeof WeeklyPlansPaginateSchema>
export type SummaryWeeklyPlan = z.infer<typeof SummaryWeeklyPlanSchema>

//TAREA LOTE
export type TaskWeeklyPlan = z.infer<typeof TaskWeeklyPlanSchema>
export type DraftCreateTaskWeeklyPlan = z.infer<typeof DraftTaskWeeklyPlan>
export type TasksWeeklyPlan = z.infer<typeof TasksWeeklyPlanSchema>
export type TaskWeeklyPlanDetails = z.infer<typeof TaskWeeklyPlanDetailsSchema>

//TAREA COSECHA LOTE
export type TasksCropWeeklyPlan = z.infer<typeof TasksCropWeeklyPlanSchema>
export type TaskCropIncomplete = z.infer<typeof TaskCropIncompleteSchema>
export type TaskCropWeeklyPlan = z.infer<typeof TaskCropWeeklyPlanSchema>
export type TaskCropWeeklyPlanDetail = z.infer<typeof TaskCropWeeklyPlanDetailSchema>
export type DraftTaskCropWeeklyPlan = z.infer<typeof DraftTaskCropWeeklyPlanSchema>

//INSUMOS
export type Insumo = z.infer<typeof InsumoSchema>
export type DraftInsumo = Omit<Insumo,'id'>
export type Insumos = z.infer<typeof InsumosSchema>

export type TaskInsumo = z.infer<typeof TaskInsumoSchema>

//EMPLEADOS
export type Employee = z.infer<typeof EmployeeSchema>
export type EmployeesCrop = z.infer<typeof EmployeesTaskCropPlanSchema>
export type EmployeeCrop = z.infer<typeof EmployeeTaskCropPlanSchema>

//DASHBOARD INFO
export type SummaryEmployeesHours = z.infer<typeof SummaryHoursEmployeesSchema>
export type SummaryEmployeeHours = z.infer<typeof SummaryHoursEmployeeSchema>
export type TaskInProgress = z.infer<typeof TaskInProgressSchema>
export type FinishedTask = z.infer<typeof FinishedTaskSchema>
export type SummaryFincaTasks = z.infer<typeof SummaryFincaTasksSchema>

//PRODUCTOS
export type PaginateProducts = z.infer<typeof ProductsPaginateSchema>
export type Product = z.infer<typeof ProductSchema>
export type DraftProduct = z.infer<typeof DraftProductSchema>
export type ProductDetail = z.infer<typeof DetailProductSchema>

//CANASTAS
export type Basket = z.infer<typeof BasketSchema>

//BOLETAS
export type DraftBoletaRMP = z.infer<typeof DraftBoletaSchema>
export type BoletasPaginate = z.infer<typeof BoletasPaginateSchema>
export type Boleta = z.infer<typeof BoletaSchema>
export type BoletaDetail = z.infer<typeof BoletaRMPDetailSchema>
export type DraftFormProd = z.infer<typeof DraftFormProdSchema>
export type DraftBoletaCalidad = z.infer<typeof DraftBoletaControlCalidadSchema>
export type ResultBoletaCalidad = z.infer<typeof ResultsQualityControlDocSchema>
export type BoletaInfoAll = z.infer<typeof BoletaInfoAllSchema>

//VARIEDADES CALIDADD
export type VarietiesPaginate = z.infer<typeof VarietiesPaginateSchema>
export type Variety = z.infer<typeof VarietySchema>
export type DraftVariety = Omit<Variety, 'id'>

//DEFECTOS
export type DraftDefecto = z.infer<typeof DraftDefectoSchema>
export type DefectsPaginate = z.infer<typeof DefectsPaginateSchema>
export type Defect = z.infer<typeof DefectSchema>

//PRODUCTORES
export type Producer = z.infer<typeof ProducerSchema>
export type DraftProducer = Omit<Producer, 'id'>
export type ProducersPaginate = z.infer<typeof ProducersPaginateSchema>

//PLANTAS 
export type Planta = z.infer<typeof PlantaSchema>

//CONDICIONES TRANSPORTE
export type DraftTransporteCondicion = z.infer<typeof DraftTransporteCondicionSchema>
export type TransporteConditionsPaginate = z.infer<typeof TransporteConditionsPaginateSchema>
export type TransporteCondition = z.infer<typeof TransporteConditionSchema>

export type TransporteInspection = z.infer<typeof TransporteInspectionSchema>
export type TransporteInspectionPaginate = z.infer<typeof TransporteInspectionsPaginateSchema>

//BOLETAS TRANSPORTES
export type DraftBoletaTransporte = z.infer<typeof DraftBoletaTransportSchema>

//FILTROS
export type FiletrsBoletaRMP = z.infer<typeof FiletrsBoletaRMPSchema>

export type TaskCropInProgress = z.infer<typeof TaskCropInProgressSchema>
