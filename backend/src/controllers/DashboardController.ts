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
        const result = await changeRequestRepository.createQueryBuilder("cr")
          .select("COUNT(cr.id)", "total")
          .addSelect("SUM(CASE WHEN cr.status = 'PENDING' THEN 1 ELSE 0 END)", "pending")
          .addSelect("SUM(CASE WHEN cr.status = 'APPROVED' THEN 1 ELSE 0 END)", "approved")
          .addSelect("SUM(CASE WHEN cr.status = 'REJECTED' THEN 1 ELSE 0 END)", "rejected")
          .where("cr.createdById = :userId", { userId: (req as any).user.id })
          .getRawOne();
          
        const total = parseInt(result?.total || '0', 10);
        const pending = parseInt(result?.pending || '0', 10);
        const approved = parseInt(result?.approved || '0', 10);
        const rejected = parseInt(result?.rejected || '0', 10);

        return res.status(200).json({
          success: true,
          data: { total, pending, approved, rejected },
        });
      } else {
        // Supervisor metrics
        const result = await changeRequestRepository.createQueryBuilder("cr")
          .select("SUM(CASE WHEN cr.status = 'PENDING' THEN 1 ELSE 0 END)", "pendingApproval")
          .addSelect("SUM(CASE WHEN cr.status = 'APPROVED' AND cr.approvedAt >= :today THEN 1 ELSE 0 END)", "approvedToday")
          .addSelect("SUM(CASE WHEN cr.status = 'REJECTED' AND cr.approvedAt >= :today THEN 1 ELSE 0 END)", "rejectedToday")
          .setParameter("today", today)
          .getRawOne();

        const pendingApproval = parseInt(result?.pendingApproval || '0', 10);
        const approvedToday = parseInt(result?.approvedToday || '0', 10);
        const rejectedToday = parseInt(result?.rejectedToday || '0', 10);

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
