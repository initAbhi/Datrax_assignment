import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { ChangeRequest, RequestStatus } from "../entities/ChangeRequest";
import { UserRole } from "../entities/User";
import { MoreThanOrEqual } from "typeorm";

export class DashboardController {
  async getMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      if (!(req as any).user) return res.status(401).json({ success: false, message: "Unauthorized" });

      const changeRequestRepository = AppDataSource.getRepository(ChangeRequest);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if ((req as any).user.role === UserRole.MANAGER) {
        // Manager metrics
        const total = await changeRequestRepository.count({ where: { createdById: (req as any).user.id } });
        const pending = await changeRequestRepository.count({ where: { createdById: (req as any).user.id, status: RequestStatus.PENDING } });
        const approved = await changeRequestRepository.count({ where: { createdById: (req as any).user.id, status: RequestStatus.APPROVED } });
        const rejected = await changeRequestRepository.count({ where: { createdById: (req as any).user.id, status: RequestStatus.REJECTED } });
        
        return res.status(200).json({
          success: true,
          data: { total, pending, approved, rejected },
        });
      } else {
        // Supervisor metrics
        const pendingApproval = await changeRequestRepository.count({ where: { status: RequestStatus.PENDING } });
        const approvedToday = await changeRequestRepository.count({ 
          where: { status: RequestStatus.APPROVED, approvedAt: MoreThanOrEqual(today) } 
        });
        const rejectedToday = await changeRequestRepository.count({ 
          where: { status: RequestStatus.REJECTED, approvedAt: MoreThanOrEqual(today) } // We re-use approvedAt for completion timestamp here
        });

        return res.status(200).json({
          success: true,
          data: { pendingApproval, approvedToday, rejectedToday },
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
