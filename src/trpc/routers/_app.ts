import {  createTRPCRouter} from '../init';
import { workflowRouter } from '@/app/features/workflows/servers/routers';
export const appRouter = createTRPCRouter({
  workflows: workflowRouter,
}); 

// export type definition of API
export type AppRouter = typeof appRouter;
