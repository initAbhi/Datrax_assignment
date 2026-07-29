import { Request, Response, NextFunction } from "express";
import { ChangeRequestService } from "../services/ChangeRequestService";
import { RequestStatus } from "../entities/ChangeRequest";

const changeRequestService = new ChangeRequestService();

export class ChangeRequestController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!(req as any).user) return res.status(401).json({ success: false, message: "Unauthorized" });
      
      const newRequest = await changeRequestService.create(req.body, (req as any).user.id);
      
      res.status(201).json({
        success: true,
        message: "Change request created successfully",
        data: newRequest,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyRequests(req: Request, res: Response, next: NextFunction) {
    try {
      if (!(req as any).user) return res.status(401).json({ success: false, message: "Unauthorized" });
      
      const requests = await changeRequestService.findAllManagerRequests((req as any).user.id);
      
      res.status(200).json({
        success: true,
        message: "Requests fetched successfully",
        data: requests,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPendingRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const requests = await changeRequestService.findAllPending();
      
      res.status(200).json({
        success: true,
        message: "Pending requests fetched successfully",
        data: requests,
      });
    } catch (error) {
      next(error);
    }
  }

  async getApprovedQueue(req: Request, res: Response, next: NextFunction) {
    try {
      const requests = await changeRequestService.findAllApproved();
      
      res.status(200).json({
        success: true,
        message: "Approved queue fetched successfully",
        data: requests,
      });
    } catch (error) {
      next(error);
    }
  }

  async getDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const request = await changeRequestService.getDetails(req.params.id as string);
      
      res.status(200).json({
        success: true,
        message: "Request details fetched successfully",
        data: request,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      if (!(req as any).user) return res.status(401).json({ success: false, message: "Unauthorized" });
      
      const { status } = req.body;
      const updatedRequest = await changeRequestService.updateStatus(req.params.id as string, status as RequestStatus, (req as any).user.id);
      
      res.status(200).json({
        success: true,
        message: `Request ${status.toLowerCase()} successfully`,
        data: updatedRequest,
      });
    } catch (error) {
      next(error);
    }
  }
}
