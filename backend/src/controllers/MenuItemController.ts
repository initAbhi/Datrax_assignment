import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { MenuItem } from "../entities/MenuItem";

export class MenuItemController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const menuItemRepository = AppDataSource.getRepository(MenuItem);
      const items = await menuItemRepository.find({
        skip: (page - 1) * limit,
        take: limit,
      });
      
      res.status(200).json({
        success: true,
        message: "Menu items fetched successfully",
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }
}
