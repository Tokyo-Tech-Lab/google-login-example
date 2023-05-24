import dashboardRouters from '@/features/dashboard/routers';
import authRouters from '../../features/auth/routers';

export const routers = [...authRouters, ...dashboardRouters];
